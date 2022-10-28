import type { InferGetStaticPropsType } from "next";
import { cmsTrpc } from "../lib/clientTrpc";
import { GetStaticProps } from "next";

function HomePage({
  translations,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <div>
        <h1>NextJS x tRPC x KeystoneJS</h1>
        {translations && translations.map((item) => (
          <div key={item.homeText}>
            <h2>{item.language}</h2>
            <p>{item.homeText}</p>
          </div>
        ))}
        <pre>{JSON.stringify(translations)}</pre>
      </div>
    </>
  );
};

export const getStaticProps = async () => {

  const translations = await cmsTrpc.translations.translations.query().catch(e => console.error("Couldnt get cms data"));

  return {
    props: {
      translations: translations || undefined,
    },
  };
};

export default HomePage;
