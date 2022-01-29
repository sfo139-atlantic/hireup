import { useRouter } from 'next/router';

export default function Proposal() {
  const router = useRouter()
  const { id } = router.query

  return <h1>Hell {id}</h1>
}