(() => {
  const SUPABASE_URL = "https://mroarbksesproqwdscjk.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yb2FyYmtzZXNwcm9xd2RzY2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTc0NjgsImV4cCI6MjA3NDEzMzQ2OH0.IFdSJB1PWKLuOvf8IWXk7aE2UGjSAsgZBxpb_8Nm4tQ";

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Exponemos funciones simples al resto del sitio
  window.db = {
    client,
    async saveSignup(data) {
      // Inserta un solo registro. Devuelve { data, error }
      return await client.from("signups").insert([data]);
    }
  };
})();
