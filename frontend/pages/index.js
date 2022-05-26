import Head from 'next/head';
import PageTemplate from '../components/PageTemplate';
import { Typography } from '@mui/material';

function mainContent() {
  return (
    <Typography color="#ffffff" fontSize={40}>
      Домашняя (Home) страница (page) автопредприятия (?)
    </Typography>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Автопредприятие</title>
      </Head>
      <PageTemplate hasSidePanels={false} mainPanel={mainContent()}/>
    </>
  );
}