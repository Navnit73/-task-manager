// pages/index.js
import Head from 'next/head';
import TaskManager from '../components/TaskManager';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Task Manager</title>
      </Head>
      <TaskManager />
    </div>
  );
}
