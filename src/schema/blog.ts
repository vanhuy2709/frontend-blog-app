import * as yup from 'yup';

// Blog Initial Values
export const initialValuesBlog = {
  title: '',
  status: '',
  author: '',
  content: '',
  image: ''
}

// Blog Schema
export const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  status: yup.string().required("Status is required"),
  author: yup.string().required("Author is required"),
  // content: yup.string().required("Content is required"),
  // image: yup.string().required("Image is required"),
})