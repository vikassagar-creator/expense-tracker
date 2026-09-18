const API_URL = import.meta.env.VITE_API_URL;

export const warmUpBackend = async () => {
  try {
    await fetch(`${API_URL}/health`);
  } catch (error) {
    // silent fail
  }
};