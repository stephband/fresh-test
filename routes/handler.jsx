// routes/about.jsx

export const handler = {
    GET: async (req, ctx) => {
        const response = await ctx.render();
        response.headers.set("X-Custom-Header", "Hello");
        return response;
    }
};

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>This is the about page.</p>
    </main>
  );
}
