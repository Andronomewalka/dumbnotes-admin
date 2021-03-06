import React, { FC, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BackA, BackIcon, Form, Label, SubmitButton, ValidationError } from 'utils';
import { useUpdatePost } from 'hooks/useUpdatePost';
import { useCreatePost } from 'hooks/useCreatePost';
import { ContentInput, ContentLabel, PostId, SingleInput } from './styles';
import { PostType } from './types';

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
        let isRouteChanged = false;
        const onRouteChanged = () => {
          isRouteChanged = true;
        };
        try {
          router.events.on('routeChangeComplete', onRouteChanged);
          let successFetch = false;

          if (router.asPath === '/new') {
            const newPostId = await createPost({ ...values });
            if (newPostId && !isRouteChanged) {
              setPostId(newPostId);
              successFetch = true;
            }
          } else {
            const res = await updatePost(oldPath.current, { id: postId, ...values });
            if (res && !isRouteChanged) {
              successFetch = true;
            }
          }

          if (successFetch) {
            oldPath.current = values.path;
            await router.push(`${values.path}`, undefined, { shallow: true });
            document.title = values.name;
          }

          setSubmitting(false);
        } finally {
          router.events.off('routeChangeComplete', onRouteChanged);
        }
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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Link href={process.env.NEXT_PUBLIC_ORIGIN_SELF + '/'} passHref={true}>
        <BackA>
          <BackIcon />
          Back
        </BackA>
      </Link>
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
