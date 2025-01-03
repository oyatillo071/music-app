export default async function getToken() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          import.meta.env.VITE_CLIENT_ID +
            ":" +
            import.meta.env.VITE_CLIENT_SECRET
        )}`,
      },
      body: "grant_type=client_credentials",
    });
    const auth = await response.json();
    if (auth.access_token) {
      //   console.log(auth);
      localStorage.setItem(
        "access_token",
        `${auth.token_type} ${auth.access_token}`
      );
    }
  } catch (err) {
    console.log(err);
  }
}

import axios from "axios";

export async function getPlaylists() {
  try {
    await getToken();
    const ACCESS_TOKEN = localStorage.getItem("access_token");
    console.log(ACCESS_TOKEN);

    if (!ACCESS_TOKEN) {
      console.log("Access token not found. Please authenticate first.");
      return "Access token not found. Please authenticate first.";
    }

    let response = await axios.get(
      "https://api.spotify.com/v1/browse/categories",
      //   "https://api.spotify.com/v1/browse/featured-playlists'",
      {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(error);
    console.error(err);
    return err.message;
  }
}

export async function getPlaylistsById(href) {
  try {
    await getToken();
    const ACCESS_TOKEN = localStorage.getItem("access_token");
    console.log(ACCESS_TOKEN);

    if (!ACCESS_TOKEN) {
      console.log("Access token not found. Please authenticate first.");
      return "Access token not found. Please authenticate first.";
    }

    let response = await axios.get(
      `${href}`,
      //   `https://api.spotify.com/v1/browse/categories/${id}`,
      {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      }
    );
    console.log(response);

    return response;
  } catch (err) {
    console.error(err);
    return err.message;
  }
}

// export const getPlaylists = async () => {
//   try {
//     await getToken();

//     const ACCESS_TOKEN = localStorage.getItem("access_token");
//     console.log(ACCESS_TOKEN);

//     if (!ACCESS_TOKEN) {
//       console.log("Access token not found. Please authenticate first.");

//       return "Access token not found. Please authenticate first.";
//     }

//     let response = await fetch(
//       "https://api.spotify.com/v1/browse/featured-playlists",
//       {
//         headers: {
//           Authorization: ACCESS_TOKEN,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       console.log(`Error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log(data);

//     return data;
//   } catch (err) {
//     console.error(err);
//     return err.message;
//   }
// };

export const fetchDeezerPlaylist = async (id) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/playlist/${id}`;

  const options = {
    headers: {
      "x-rapidapi-key": "e6fa4400b4msh38cf283d26a40eep144f06jsn097f4bdbcf1e",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchDeezerSearch = async (item) => {
  const options = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: { q: item },
    headers: {
      "x-rapidapi-key": "e6fa4400b4msh38cf283d26a40eep144f06jsn097f4bdbcf1e",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

export const fetchDeezerSearchAlbom = async (item) => {
  const options = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/album/",
    params: { q: item },
    headers: {
      "x-rapidapi-key": "e6fa4400b4msh38cf283d26a40eep144f06jsn097f4bdbcf1e",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
