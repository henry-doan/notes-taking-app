import { useState, useEffect } from 'react';

const useForm = (cb, validate, initial = {}) => {
  const [values, setValues] = useState(initial)
  const [errs, setErrs] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitAttempts, setSubmitAttempts] = useState(0)
  

  useEffect(() => {
    if (Object.keys(errs).length === 0 && isSubmitting) {
      cb();
    }
    setIsSubmitting(false);
  }, [errs])

  useEffect(() => {
    setIsSubmitting(false)
    if (submitAttempts > 0){
      setErrs(validate(values))
    }
  }, [values])

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitAttempts(submitAttempts + 1)
    setErrs(validate(values))
    setIsSubmitting(true)
  }

  const handleChange = (name, value) => {
    if (!isSubmitting) {
      setValues(values => ({
        ...values,
        [name]: value
      }))
    }
  }

  return {
    handleChange,
    handleSubmit,
    values,
    errs
  }
}

export default useForm;