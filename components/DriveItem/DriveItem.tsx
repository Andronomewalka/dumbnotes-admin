import React, { FC, MouseEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DriveItemType } from './types';
import {
  ContentInput,
  Label,
  Form,
  SubmitButton,
  BackButton,
  ValidationError,
  SingleInput,
} from './styles';
import { useUpdateDriveItem } from 'hooks/useUpdateDriveItem';
import { BackButtonIcon } from './BackButtonIcon';

export const DriveItem: FC<DriveItemType> = ({ id, name, path, content }) => {
  const router = useRouter();
  const updateDriveItem = useUpdateDriveItem();

  const validationScema = Yup.object().shape({
    name: Yup.string().required('required'),
    path: Yup.string()
      .matches(/^([a-z0-9\-]+)$/, 'only english letters in lowercase or dashes')
      .required('required'),
  });

  const formik = useFormik({
    initialValues: {
      name: name ?? '',
      path: path ?? '',
      content: content ?? '',
    },
    validationSchema: validationScema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      (async () => {
        updateDriveItem({ id, ...values }, id === 'new');
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
      <Label>
        Item name
        <SingleInput
          name='name'
          type='input'
          placeholder='Name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <ValidationError>
          {formik.errors.name && formik.touched.name ? <p>{formik.errors.name}</p> : null}
        </ValidationError>
      </Label>
      <Label>
        Item path
        <SingleInput
          name='path'
          type='input'
          placeholder='Path'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.path}
        />
        <ValidationError>
          {formik.errors.path && formik.touched.path ? <p>{formik.errors.path}</p> : null}
        </ValidationError>
      </Label>
      <Label>
        Item content
        <ContentInput
          name='content'
          placeholder='Content'
          onChange={formik.handleChange}
          onKeyDown={onContentKeyDown}
          ref={contentRef}
          value={formik.values.content}
        />
      </Label>
      <SubmitButton
        type='submit'
        disabled={formik.isSubmitting}
        isRequesting={formik.isSubmitting}
        value='Save'
      />
    </Form>
  );
};
