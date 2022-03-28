import React, { FC, useState, useRef, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PostType } from 'blog-app-shared';
import {
  BackButton,
  BackButtonIcon,
  Form,
  Label,
  SubmitButton,
  ValidationError,
} from 'shared';
import { useUpdatePost } from 'hooks/useUpdatePost';
import { useCreatePost } from 'hooks/useCreatePost';
import { ContentInput, ContentLabel, PostId, SingleInput } from './styles';

export const Post: FC<PostType> = ({ id, name, path, content }) => {
  const router = useRouter();
  const [postId, setPostId] = useState(id);
  const updatePost = useUpdatePost();
  const createPost = useCreatePost();
  const oldPath = useRef(path);

  const validationScema = Yup.object().shape({
    name: Yup.string().required('required'),
    path: Yup.string()
      .matches(/^([a-z0-9\-]+)$/, 'only english letters in lowercase or dashes')
      .required('required'),
  });

  const formik = useFormik({
    initialValues: {
      name: name ?? '',
      path: path === 'new' || !path ? '' : path,
      content: content ?? '',
    },
    validationSchema: validationScema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      (async () => {
        if (router.asPath === '/new') {
          const newPostId = await createPost({ ...values });
          if (newPostId) {
            setPostId(newPostId);
            router.push(`${values.path}`, undefined, { shallow: true });
          }
        } else {
          const res = await updatePost(oldPath.current, { id, ...values });
          if (res) {
            oldPath.current = values.path;
            router.push(`${values.path}`, undefined, { shallow: true });
          }
        }
        setSubmitting(false);
      })();
    },
  });

  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const onContentKeyDown = (e: any) => {
    if (e.key == 'Tab') {
      if (!contentRef.current) {
        return;
      }
      e.preventDefault();

      const textarea = contentRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.value =
        textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 1;
      formik.setFieldValue('content', textarea.value);
    }
  };

  const onBackClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('http://localhost:4001');
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <BackButton onClick={onBackClicked}>
        <BackButtonIcon />
        Back
      </BackButton>
      <PostId>{postId}</PostId>
      <Label>
        Post name
        <SingleInput
          name='name'
          type='input'
          placeholder='Name'
          spellCheck='false'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <ValidationError>
          {formik.errors.name && formik.touched.name ? <p>{formik.errors.name}</p> : null}
        </ValidationError>
      </Label>
      <Label>
        Post path
        <SingleInput
          name='path'
          type='input'
          placeholder='Path'
          spellCheck='false'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.path}
        />
        <ValidationError>
          {formik.errors.path && formik.touched.path ? <p>{formik.errors.path}</p> : null}
        </ValidationError>
      </Label>
      <ContentLabel>
        Post content
        <ContentInput
          name='content'
          placeholder='Content'
          spellCheck='false'
          onChange={formik.handleChange}
          onKeyDown={onContentKeyDown}
          ref={contentRef}
          value={formik.values.content}
        />
      </ContentLabel>
      <SubmitButton
        type='submit'
        disabled={formik.isSubmitting || !formik.isValid}
        value='Save'
      />
    </Form>
  );
};
