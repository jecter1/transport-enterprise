import React from "react";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Link from 'next/link';


export default function ServiceStaffInfo() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Link passHref href={id + "/repairs"}>
      <Button style={{marginTop: '2%'}}>
        Ремонтные работы {}
      </Button>
    </Link>
  )
}
