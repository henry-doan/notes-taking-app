import { useState, useEffect } from 'react';

const useForm = (cb, validate, initial = {}) => {
  const [values, setValues] = useState(initial)
  const [errs, setErrs] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitAttempts, setSubmitAttempts] = useState(0)
  
}

export default useForm;