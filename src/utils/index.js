import cloneDeep from 'lodash/cloneDeep'

export {cloneDeep}

export const objectToFormdata = (obj, form, namespace) => {
  let fd = form || new FormData()
  let formKey

  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      let key = Array.isArray(obj)
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
