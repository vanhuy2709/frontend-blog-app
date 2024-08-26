import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { modalStyle } from '@/styles/modal.style'
import { sendRequest } from '@/utils/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

interface IProps {
  openModalDelete: boolean;
  setOpenModalDelete: (v: boolean) => void;
  blog: IBlog | undefined;
}

const ModalDeleteBlog = (props: IProps) => {
  const { blog, openModalDelete, setOpenModalDelete } = props;
  const router = useRouter();

  // Show message 
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<boolean>(false);

  // Submit delete blog
  const handleDeleteBlog = async () => {
    const res = await sendRequest<IBackendRes<IBlog>>({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blog?.id}`,
    })

    if (res) {
      setOpenMessage(true);
      setMessage(`Delete blog success`);
      setStatusMessage(true);
      setOpenModalDelete(false);
      router.push("/");
    }
  }

  return (
    <>
      <Modal
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Delete Blog
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure to delete this blog ?
          </Typography>

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              variant='contained'
              color='inherit'
              onClick={() => setOpenModalDelete(false)}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => handleDeleteBlog()}
            >
              Delete
            </Button>
          </Stack>
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

export default ModalDeleteBlog