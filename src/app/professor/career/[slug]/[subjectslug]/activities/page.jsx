import Link from 'next/link'

export default function Activities ({ params }) {
  console.log(params)
  return (
    <div>
      <h1>Activities</h1>
      <Link
        href={`/professor/career/${params.slug}/${params.subjectslug ?? ''}/activities/create`}
      >
        ª        <a>Activity</a>
      </Link>
    </div>
  )
}
