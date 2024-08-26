'use client';
import 'react-quill/dist/quill.snow.css';
import { blogSchema } from "@/schema/blog";
import { sendRequest } from "@/utils/api";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Formik } from "formik";
import { VisuallyHiddenInput } from '@/styles/visually.hidden.input';
import { modalStyle } from '@/styles/modal.style';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface IProps {
  openModalEdit: boolean;
  setOpenModalEdit: (v: boolean) => void;
  blog: IBlog | undefined;
}

const ModalEditBlog = (props: IProps) => {
  const { openModalEdit, setOpenModalEdit, blog } = props;

  const [image, setImage] = useState<File>();
  const [content, setContent] = useState<string>(blog?.attributes.content ?? "");

  // Show message 
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<boolean>(false);

  // Initial values
  const initialValuesBlog = {
    title: blog?.attributes.title,
    status: blog?.attributes.status,
    author: blog?.attributes.author,
  }

  // Handle upload file
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // @ts-ignore
      setImage(e.target.files[0]);
    }
  }

  // Submit Update Blog
  const handleFormSubmit = async (values: any, { resetForm }: { resetForm: any }) => {
    // Upload Image
    const formData = new FormData();
    // @ts-ignore
    formData.append("files", image);

    try {
      if (image) {
        const res = await axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, formData)
        if (res.data) {

          // Update blog
          const updatedBlog = {
            data: {
              ...values,
              content,
              image: res.data
            }
          }

          const response = await sendRequest<IBackendRes<IBlog>>({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blog?.id}`,
            body: updatedBlog,
          })

          if (response.data) {
            setOpenMessage(true);
            setMessage(`Update blog success`);
            setStatusMessage(true);
            setOpenModalEdit(false);
          }
        }
      }

      else {
        // Update blog
        const updatedBlog = {
          data: {
            ...values,
            content,
            image: blog?.attributes.image.data,
          }
        }

        const response = await sendRequest<IBackendRes<IBlog>>({
          method: "PUT",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blog?.id}`,
          body: updatedBlog,
        })

        if (response.data) {
          setOpenMessage(true);
          setMessage(`Update blog success`);
          setStatusMessage(true);
          setOpenModalEdit(false);
        }
      }

    } catch (error) {
      alert("Error");
    }
  }

  return (
    <>
      <Modal
        open={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" textAlign="center">
            Edit Blog
          </Typography>

          <Formik
            initialValues={initialValuesBlog}
            validationSchema={blogSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>

                <Stack spacing={2}>
                  {/* Title */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                  />

                  {/* Author */}
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Author"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.author}
                      name="author"
                      error={!!touched.author && !!errors.author}
                      helperText={touched.author && errors.author}
                    />

                    {/* Status */}
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.status}
                        name="status"
                        error={!!touched.status && !!errors.status}
                        // helperText={touched.status && errors.status}
                        defaultValue=""
                      >
                        <MenuItem value={"draft"}>Draft</MenuItem>
                        <MenuItem value={"published"}>Published</MenuItem>
                        <MenuItem value={"archived"}>Archived</MenuItem>
                      </Select>
                      <FormHelperText sx={{ color: '#D32F2F' }}>
                        {touched.status && errors.status}
                      </FormHelperText>
                    </FormControl>
                  </Stack>

                  <Box>
                    <ReactQuill
                      theme="snow"
                      placeholder='Write your content here...'
                      style={{ height: '50vh' }}
                      value={content}
                      onChange={(value) => setContent(value)}
                    />
                  </Box>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={9}>
                  {/* Upload Image */}
                  <Box>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        backgroundColor: '#4640DE',
                        '&:hover': {
                          backgroundColor: '#6e6ae2'
                        }
                      }}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => handleUploadFile(e)}
                      />
                    </Button>
                  </Box>

                  <Typography>{image ? image.name : ""}</Typography>
                </Stack>

                <Box textAlign={"center"} mt={2}>
                  {/* Submit */}
                  <Button type='submit' variant='contained'>
                    Update Blog
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Show message */}
      <Snackbar open={openMessage} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={statusMessage ? 'success' : 'error'} onClose={() => setOpenMessage(false)}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ModalEditBlog