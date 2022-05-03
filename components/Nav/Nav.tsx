import React, { FC, useRef } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BackA, BackIcon, Form, SubmitButton } from 'utils';
import { useUpdateNavItems } from 'hooks/useUpdateNavItems';
import { ContentInput, ContentLabel, ValidationError } from './styles';
import { NavType } from './types';

export const Nav: FC<NavType> = ({ navItemsContent }) => {
  const updateNavItems = useUpdateNavItems();

  const validationScema = Yup.object().shape({
    content: Yup.string()
      .required('required')
      .test('isJson', 'not valid json', (field) => {
        try {
          if (field) {
            JSON.parse(field);
          }
          return true;
        } catch {
          return false;
        }
      }),
  });

  const formik = useFormik({
    initialValues: {
      content: navItemsContent ?? '',
    },
    validationSchema: validationScema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      (async () => {
        await updateNavItems(JSON.parse(values.content));
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
      formik.setTouched({ ...formik.touched, content: true });
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
      <ContentLabel>
        Navigation schema
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
      <ValidationError>{formik.errors.content}</ValidationError>
      <SubmitButton
        type='submit'
        disabled={formik.isSubmitting || !formik.isValid}
        value='Save'
      />
    </Form>
  );
};
