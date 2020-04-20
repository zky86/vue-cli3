import cloneDeep from 'lodash/cloneDeep'

export { cloneDeep }

export const objectToFormdata = (obj, form, namespace) => {
  const fd = form || new FormData()
  let formKey

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      const key = Array.isArray(obj)
        ? `[${property}]`
        : `.${property}`
      if (namespace) {
        formKey = namespace + key
      } else {
        formKey = property
      }

      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString())
      } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objectToFormdata(obj[property], fd, formKey)
      } else if (obj[property] !== undefined) {
        fd.append(formKey, obj[property])
      }
    }
  }

  return fd
}

export const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}
