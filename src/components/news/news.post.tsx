'use client';
import Typography from "@mui/material/Typography";
import { dmSans } from "@/lib/font";
import Image from "next/image";
// import Stack from "@mui/material/Stack";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModalEditBlog from "../modal/modal.edit.blog";
// import { useState } from "react";
// import ModalDeleteBlog from "../modal/modal.delete.blog";

interface IProps {
  data: IBlog | undefined,
}

const NewsPost = (props: IProps) => {

  const { data } = props;
  // const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  // const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  return (
    <>
      <Typography sx={{
        fontFamily: dmSans.style,
        textAlign: 'center',
        fontSize: { xs: "24px", sm: "40px", md: "60px" },
        fontWeight: 600,
        lineHeight: { xs: "36px", sm: "50px", md: "70px" },
      }}>
        {data?.attributes.title}
      </Typography>

      <Typography sx={{
        textAlign: "center",
        fontFamily: dmSans.style,
        color: "#717171",
        fontWeight: 500,
        fontSize: { xs: "16px", sm: "24px" },
        mb: "30px",
        mt: "30px"
      }}>
        {data?.attributes.publishedAt.substring(0, 10)}
      </Typography>

      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.attributes.image.data.attributes.url}`}
        alt={`${data?.attributes.image.data.attributes.name}`}
        width={0}
        height={0}
        sizes="100vw"
        priority
        style={{ width: "100%", height: "auto" }}
      />

      <div
        dangerouslySetInnerHTML={{ __html: data?.attributes.content ?? "" }}
        style={{
          fontSize: "18px",
          textAlign: "justify",
          marginTop: "30px",
          marginBottom: "30px"
        }}
      ></div>

      {/* <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <IconButton
          children={<EditIcon />}
          color="warning"
          onClick={() => setOpenModalEdit(true)} />
        <IconButton
          children={<DeleteIcon />}
          color="error"
          onClick={() => setOpenModalDelete(true)} />
      </Stack> */}

      {/* <ModalEditBlog
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        blog={data}
      />

      <ModalDeleteBlog
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        blog={data}
      /> */}
    </>
  )
}

export default NewsPost