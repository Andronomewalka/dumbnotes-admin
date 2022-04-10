import React, { FC, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { SingleInput } from './SingleInput';
import { AuthForm } from './styles';
import { Direction, SingleInputType } from './types';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';

const inputsAmount = 6;

export const Auth: FC = () => {
  const router = useRouter();
  const authenticate = useAuth();

  const [inputsRefs] = useState(() => new Array(inputsAmount).fill(React.createRef()));

  const [inputs, setInputs] = useState<SingleInputType[]>(() =>
    new Array(inputsAmount).fill(null).map((_, index) => ({
      id: index,
      value: '',
      isSubmitting: false,
      onChange: onSingleInputChange,
      onBackspace: onSingleInputBackspace,
      onRight: onSignleInputRight,
      onLeft: onSignleInputLeft,
    }))
  );

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      (async () => {
        try {
          const result = await authenticate(values.code);
          if (result) {
            if (Object.keys(router.query).length === 0) {
              router.push('http://127.0.0.1:4001');
            } else if (typeof router.query.redirect === 'string') {
              router.push(router.query.redirect);
            }
          }
        } finally {
          inputs.forEach((cur) => {
            cur.value = '';
          });
          setInputs([...inputs]);
          inputsRefs[0].select();
        }
        setSubmitting(false);
      })();
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting && inputs.every((cur) => cur.value)) {
      formik.values.code = inputs.reduce((acc, cur) => acc + cur.value, '');
      formik.submitForm();
    }
  }, [formik, inputs]);

  const slideSelection = (input: SingleInputType, direction: Direction) => {
    if (input.id < 5 && direction === Direction.Front) {
      inputsRefs[input.id + 1].select();
    } else if (input.id > 0 && direction === Direction.Back) {
      inputsRefs[input.id - 1].select();
    }
  };

  const onChangeBase = (input: SingleInputType, value: string, direction: Direction) => {
    const numValue = Number.parseInt(value);
    if (value === '' || numValue === 0 || (numValue && value.length < 2)) {
      const newInputs = [...inputs];
      const changedInput = newInputs.find((cur) => cur.id === input.id);
      if (changedInput) {
        changedInput.value = value;
        slideSelection(input, direction);
      } else {
        inputsRefs[input.id].select();
      }

      setInputs(newInputs);
    }
  };

  function onSingleInputChange(input: SingleInputType, value: string) {
    onChangeBase(input, value, Direction.Front);
  }

  function onSingleInputBackspace(input: SingleInputType) {
    onChangeBase(input, '', Direction.Back);
  }

  function onSignleInputRight(input: SingleInputType) {
    slideSelection(input, Direction.Front);
  }

  function onSignleInputLeft(input: SingleInputType) {
    slideSelection(input, Direction.Back);
  }

  return (
    <AuthForm onSubmit={formik.handleSubmit}>
      {inputs.map((value) => {
        return (
          <SingleInput
            key={value.id}
            ref={(element) => (inputsRefs[value.id] = element)}
            {...value}
            isSubmitting={formik.isSubmitting}
          />
        );
      })}
    </AuthForm>
  );
};
