import Head from "next/head";
export default function ProductOverView({ id }) {
  return (
    <>
      <Head>
        <title>{id}</title>
      </Head>
      <h1 style={{ textAlign: "center" }}>id is : {id}</h1>
    </>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}
