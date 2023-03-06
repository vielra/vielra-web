import React, { FC, MouseEvent, useEffect } from 'react'

import {
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form'

// Mui components.
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// Validation schema
import { phraseFormValidation } from '@/features/phrasebook/validations'
import { yupResolver } from '@hookform/resolvers/yup'

// Interfaces
import { IPhrase, IPhraseModel } from '@/features/phrasebook/intefaces'

// Components
import { Link } from '@/components/core/link'
import { Select, TextField } from '@/components/core'
import { Button } from '@/components/core/button'
import { Iconify } from '@/components/core/iconify'

// Hooks
import { useApp } from '@/features/app/hooks'
import { useAppDispatch } from '@/plugins/redux'
import { usePhrasebook } from '@/features/phrasebook/hooks'

import { PhrasebookUtils } from '@/features/phrasebook/utils'

type TInputs = IPhraseModel

interface PhraseFormProps {
  data?: IPhrase | Partial<IPhrase>
}

const PhraseForm: FC<PhraseFormProps> = ({ data }) => {
  const dispatch = useAppDispatch()

  const isEdit = Boolean(data?.id)

  const {
    phrasebook_categoriesData,
    phrasebook_setFormIsDirty,
    phrasebook_createPhrase,
    phrasebook_createIsLoading,
  } = usePhrasebook()

  const { locale } = useApp()

  /**
   * Initial values
   */
  const initialValues: TInputs = {
    category_id: '',
    text_vi: '',
    text_en: '',
    text_id: '',
    confirmed: false,
    mark_as_created_by_system: false,
  }

  /**
   * Hook form.
   */
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(phraseFormValidation),
  })

  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()
  }

  /**
   * Hook form submit handler.
   * @param values
   */
  const onValidSubmit: SubmitHandler<TInputs> = async values => {
    dispatch(phrasebook_createPhrase(values))
  }

  const onInvalidSubmit: SubmitErrorHandler<TInputs> = (objErrors): void => {
    console.log('❌ objErrors', objErrors)
  }

  // Watch values
  useEffect(() => {
    if (dirtyFields?.category_id && dirtyFields?.text_vi) {
      dispatch(phrasebook_setFormIsDirty(true))
    } else {
      dispatch(phrasebook_setFormIsDirty(false))
    }
  }, [Object.keys(dirtyFields)])

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
    >
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Controller
          name='category_id'
          control={control}
          render={({ field: { name, value, onChange } }) => (
            <Select
              name={name}
              value={value}
              onChange={onChange}
              icon='ion:book'
              onClear={() => setValue('category_id', '')}
              fullWidth
              size='medium'
              label='Select category'
              elevation={2}
              isError={Boolean(errors?.category_id?.message)}
              helperText={
                Boolean(errors?.category_id?.message)
                  ? String(errors?.category_id?.message)
                  : undefined
              }
              options={phrasebook_categoriesData.map(x => ({
                value: x.id,
                label: PhrasebookUtils.getPhraseCategoryName(x, locale),
              }))}
            />
          )}
        />
        <Controller
          name='text_vi'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              icon='emojione:flag-for-vietnam'
              label='Tiếng việt'
              margin='none'
              elevation={2}
              multiline
              minRows={2}
              maxRows={4}
              error={Boolean(errors?.text_vi?.message)}
              helperText={
                Boolean(errors?.text_vi?.message) && errors?.text_vi?.message
              }
              inputIconStyles={{
                backgroundColor: 'background.paper',
                boxShadow: 2,
              }}
            />
          )}
        />
        <Controller
          name='text_en'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              icon='emojione:flag-for-united-kingdom'
              label='English'
              margin='none'
              elevation={2}
              multiline
              minRows={2}
              maxRows={4}
              error={Boolean(errors?.text_en?.message)}
              helperText={
                Boolean(errors?.text_en?.message) && errors?.text_en?.message
              }
              inputIconStyles={{
                backgroundColor: 'background.paper',
                boxShadow: 2,
              }}
            />
          )}
        />
        <Controller
          name='text_id'
          control={control}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              icon='emojione:flag-for-indonesia'
              label='B. Indonesia'
              margin='none'
              elevation={2}
              multiline
              minRows={2}
              maxRows={4}
              error={Boolean(errors?.text_id?.message)}
              helperText={
                Boolean(errors?.text_id?.message) && errors?.text_id?.message
              }
              inputIconStyles={{
                backgroundColor: 'background.paper',
                boxShadow: 2,
              }}
            />
          )}
        />
        <Controller
          name='confirmed'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              control={<Checkbox size='small' />}
              label='Confirmed'
            />
          )}
        />
        <Controller
          name='mark_as_created_by_system'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              control={<Checkbox size='small' />}
              label='Mark as created by sistem'
            />
          )}
        />
      </Stack>
      <Stack>
        <Button
          endIcon={
            <Iconify icon='ion:arrow-forward-outline' height={20} width={20} />
          }
          size='large'
          type='submit'
          variant='contained'
          fullWidth
          disableElevation
          sx={{ mb: 2 }}
          disabled={phrasebook_createIsLoading}
        >
          Submit Phrase
        </Button>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'pre-wrap',
            justifyContent: 'center',
          }}
        >
          <Typography component='span'>Need help ? please contact </Typography>
          <Link href='#' underline='hover'>
            Vielra Support
          </Link>
        </Box>
      </Stack>
    </Box>
  )
}

export { PhraseForm }
