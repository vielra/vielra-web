import * as Yup from 'yup'

const phraseFormValidation = Yup.object().shape({
  // category_id: Yup.string().required('Please select category'),
  category_id: Yup.string().nullable(true), // Make it optional
  text_vi: Yup.string().required('Field is required'),
  confirmed: Yup.bool(),
  mark_as_created_by_system: Yup.bool(),
})

export { phraseFormValidation }
