import { gql, useMutation, useQuery } from '@apollo/client';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { TaskType } from '@src/graphql/generated';
import {
  createAnswersFromObject,
  useTaskCompletion,
  valueToAnswerType,
} from '@src/hooks/useTaskCompletion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { create, useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  QuestionnaireLayout,
  useProgressContext,
} from '../layouts/QuestionaireLayout';
import { Button } from '../ui/Button';
import { QuestionProps } from './common';
import { gastroQuestions } from './gastroQuestions';
import { medicalQuestions, medicationQuestionnairs, medications } from './medicalQuestions';
import { metabolicQuestions } from './metabolicQuestions';
import { QuestionContainer } from './QuestionContainer';
import { threeFactorQuestions } from './threeFactorQuestions';
import { client } from '@src/graphql';
import { useUserSession } from '../../hooks/useUserSession';
import { User } from '@sentry/react';

interface FormState {
  formState: Record<string, any>;
  setFormState: (form: Record<string, any>) => void;
}

function createPersistedFormState(formName: string) {
  return create<FormState, [['zustand/persist', FormState]]>(
    persist(
      (set) => ({
        formState: {},
        setFormState: (formState: any) =>
          set((state: any) => ({
            ...state,
            formState: { ...state.formState, ...formState },
          })),
      }),
      {
        name: formName,
      }
    )
  );
}

/**
 * There is task, User task and etc. None of it makes sense as to which this fetchs from.
 * The other userTask will fail for me.
 * This succeeds with null data. Idk what that means.
 */
const userTaskQuery = gql`
  query UserTaskQuery($taskId: String!) {
    userTask(id: $taskId) {
      _id
      task {
        _id
        name
        type
      }
    }
  }
`;

/**
 * Goal is to in the future only provide questions and type then the form works out of the box.
 * Will need individual custom final submits
 * Still requires final result mapping to API call
 *
 */
export function Question() {
  const { taskId } = useRouter().query as { taskId: string };

  const [userSession] = useUserSession();
  const user = userSession?.user;

  const { data, loading } = useQuery(userTaskQuery, {
    variables: {
      taskId,
    },
  });

  if (loading)
    return (
      <QuestionnaireLayout title='Loading...'>
        <div />
      </QuestionnaireLayout>
    );

  if (data?.userTask?.task?.type === TaskType.NewPatientIntakeForm) {
    return (
      <QuestionnaireLayout title='Medical Questionnaire'>
        <div className='relative flex flex-col gap-y-3 items-center w-full'>
          <Questionnaire
            user={user}
            taskId={taskId}
            allQuestions={medicalQuestions}
            formName='medical'
          />
        </div>
      </QuestionnaireLayout>
    );
  }

  if (data?.userTask?.task?.type === TaskType.MpFeeling) {
    return (
      <QuestionnaireLayout title='Metabolic Profile (Feeling) Questionnaire'>
        <div className='relative flex flex-col gap-y-3 items-center w-full'>
          <Questionnaire
            taskId={taskId}
            allQuestions={metabolicQuestions}
            formName='metabolic'
          />
        </div>
      </QuestionnaireLayout>
    );
  }

  if (data?.userTask?.task?.type === TaskType.Gsrs) {
    return (
      <QuestionnaireLayout title='Gastrointestinal Symptoms Rating Scale'>
        <div className='relative flex flex-col gap-y-3 items-center w-full'>
          <Questionnaire
            taskId={taskId}
            allQuestions={gastroQuestions}
            formName='gsrs'
          />
        </div>
      </QuestionnaireLayout>
    );
  }

  if (data?.userTask?.task?.type === TaskType.Tefq) {
    return (
      <QuestionnaireLayout title='The Three-Factor Eating Questionnaire'>
        <div className='relative flex flex-col gap-y-3 items-center w-full'>
          <Questionnaire
            taskId={taskId}
            allQuestions={threeFactorQuestions}
            formName='tefq'
          />
        </div>
      </QuestionnaireLayout>
    );
  }

  return (
    <div className='relative flex flex-col gap-y-3 items-center w-full'>
      <p className='text-white'></p>
    </div>
  );
}

function Questionnaire({
  allQuestions,
  formName,
  taskId,
  user,
}: {
  allQuestions: QuestionProps<any>[];
  formName: string;
  taskId: string;
  user?: User;
}) {
  const [mutate] = useTaskCompletion();
  const router = useRouter();
  const store = useProgressContext();
  const [questions, setQuestions] = useState<QuestionProps<any>[]>(allQuestions);
  const { setMax, current, setCurrent } = useStore(store, (state: any) => ({
    setMax: state.setMax,
    setCurrent: state.setCurrent,
    current: state.current,
  }));

  useEffect(() => {
    setMax(questions.length);
  }, [questions.length, setMax, setCurrent]);

  useEffect(() => {
    setQuestions(allQuestions);
  }, [allQuestions.length, setQuestions])

  const boundForm = createPersistedFormState(formName);
  const onSubmit = boundForm((state: any) => ({
    setFormState: state.setFormState,
  }));

  const { handleSubmit, control, trigger, register, reset } = useForm({
    defaultValues: getStoredForm(formName),
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    reset(getStoredForm(formName));
  }, [formName, reset, taskId]);

  const question = questions?.[current];
  const Component = question?.Component;
  const endQuestion = current + 1 === questions?.length;
  console.log(question, 'QUESTION');
  /**
   * All Final Task should be submitted here.
   * Keys based of passed array ID field
   * Value is determined via field Input type
   *
   * @param data
   *
   */
  async function onSubmitForm(data: Record<string, any>) {
    console.log(data, "DATA")
    try {
      if (data?.allergies) {
        const userMedications: any = {};
        data.medications
          ?.map((m: string) => medications.find((md) => md.id === m)?.id)
          .forEach((m: string) => {
            userMedications[m] = [];
          });
        const newData = {
          allergies: data?.allergies
            .map((a: { value: string }) => a.value)
            .join(', '),
          conditions: data?.conditions.map((c: string) => c).join(', '),
          pharmacyLocation:
            String(data?.pillpack.pharmacy) === ''
              ? 'null'
              : String(data?.pillpack.pharmacy),
          usePillPack: data?.pillpack.select,
          previousConditions: data?.previousConditions
            .map((pc: string) => pc)
            .join(', '),
          medications: { ...userMedications, ...data.medicines },
          hasSurgeries: data.surgeries?.hasSurgicalHistory,
          surgicalHistory: data.surgeries?.surgicalHistory,
          hasRequiredLabs: data?.requiredLabs ? "Yes" : "No",
          requiredLabs: String(data?.requiredLabs || ""),
          labTakenAt: String(data?.labTakenAt ?? ""),
          weightLossAttemptTime: data?.weightLossAttemptTime,
          weightManagementMethods: data?.weightManagementMethods
            .map((wmm: string) => wmm)
            .join(', '),
        };

        const convertAnswersFromObjectV2 = (obj: any) => {
          const answers = [];
          for (const key in obj) {
            answers.push({
              key,
              value: obj[key],
              type: valueToAnswerType(obj[key]),
            });
          }
          return answers;
        };
        let answers = convertAnswersFromObjectV2(newData);
        const input = {
          _id: taskId,
          answers,
        };
        // await completeUserTask({ variables: { input } });
        await mutate({
          variables: {
            input,
          },
        });
        // Clear Stored Form
        boundForm.persist.clearStorage();
        await client.clearStore();
        router.replace('/dashboard/tasks');
      } else {
        const answers = createAnswersFromObject(data);
        const input = {
          _id: taskId,
          answers,
        };
        await mutate({
          variables: {
            input,
          },
        });

        // Clear Stored Form
        boundForm.persist.clearStorage();
        await client.clearStore();
        router.replace('/dashboard/tasks');
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <QuestionContainer helper={question?.helperText}>
      <div className='flex items-center justify-center'>
        {current > 0 && !endQuestion && (
          <button
            className='p-1 border rounded-md border-gray-400 w-[40px] h-[40px] flex items-center justify-center'
            onClick={() =>
              router.push(
                `/questionnaire/${router?.query?.taskId}?step=${current - 1}`
              )
            }
          >
            <ChevronLeftIcon className='stroke-gray-400 w-8 h-8' />
          </button>
        )}
      </div>
      <div className='flex-grow max-w-[500px] mx-auto w-full'>
        <div className='flex flex-col items-center w-full gap-y-3'>
          {!!Component && (
            <Component
              control={control}
              key={question.id}
              name={question.id}
              user={user}
              register={register}
              question={question.question}
              validation={question.validation}
            />
          )}
          <div className='pt-3' />
          <Button
            size='large'
            onClick={async () => {
              if (!question?.id) return;
              /**
               * Trigger validation step by step within form
               *
               */
              if (!endQuestion) {
                try {
                  const valid = await trigger(question?.id);
                  if (!!valid) {
                    handleSubmit((value) => {
                      console.log(value, 'valuessssss');
                      if (formName === 'medical' && question?.id === 'medications') {
                        const subSteps = medicationQuestionnairs.filter(m =>  value.medications?.includes(m.id));
                        const newSteps = [...medicalQuestions];
                        newSteps.splice(current + 1, 0, ...subSteps);
                        setQuestions(newSteps);
                      }
                      // onSubmit.setFormState(value);
                      router.push(
                        `/questionnaire/${router?.query?.taskId}?step=${current + 1
                        }`
                      );
                    })();
                  }
                } catch (error) {
                  /**
                   * This should never happen
                   */
                }
              } else {
                handleSubmit(onSubmitForm)();
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className='flex-1'>
        {current > 0 && !endQuestion && (
          <button
            className='p-1 border rounded-md border-gray-400 w-[40px] h-[40px] flex items-center justify-center invisible'
            onClick={() => setCurrent(current - 1)}
          >
            <ChevronLeftIcon className='stroke-gray-400 w-8 h-8' />
          </button>
        )}
      </div>
    </QuestionContainer>
  );
}

function getStoredForm(formName: string) {
  const storage = localStorage.getItem(formName);
  try {
    const parsed = JSON.parse(storage || '{}');
    return parsed?.state?.formState || {};
  } catch (error) {
    return {};
  }
}

const requiredDocNames = [
  'TSH',
  'Hb1Ac',
  'Lipid Panel',
  'Comprehensive Metabolic Panel',
];
