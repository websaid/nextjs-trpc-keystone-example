import type { InferGetStaticPropsType } from "next";
import { cmsTrpc, trpc } from "../lib/clientTrpc";
import { DocumentRenderer } from "@keystone-6/document-renderer";

function HomePage({
  translation,
  blog,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const stringToSlate = (str: string) =>
    JSON.parse(str) as unknown as Parameters<
      typeof DocumentRenderer
    >["0"]["document"];

  const {data, isLoading} = trpc.index.getTestimonials.useQuery()

  return (
    <>
      <div>
        <h1>NextJS x tRPC x KeystoneJS</h1>
        <p>This example shows</p>
        <h2>User Testimonials</h2>
        {isLoading ? (
          <p>Testimonials Loading</p>
        ) : (
          data?.map((testimonial) => <div key={testimonial.id}>
            <h3>{testimonial.name}</h3>
            <p>{testimonial.content}</p>
          </div>)
        )}
        {translation && (
          <div key={translation.homeText}>
            <h2>{translation.language}</h2>
            <p>{translation.homeText}</p>
          </div>
        )}
        <h2>Testimonials</h2>
        {blog &&
          blog.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <DocumentRenderer document={stringToSlate(post.content)} />
            </div>
          ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const translation = await cmsTrpc.translations.translation
    .query({ option: "de" })
    .catch((e) => console.error("Couldnt get cms data"));
  const blog =
    (await cmsTrpc.blog.published
      .query()
      .catch((e) => console.error("Couldnt get cms data"))) || undefined;

  return {
    props: {
      translation: translation || undefined,
      blog: blog,
    },
  };
};

export default HomePage;
