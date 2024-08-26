
import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Auth/Login';
import SongList from '../components/MusicPlayer/SongList';
import Layout from './Layout';
import Profile from '../components/Auth/Profile';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../components/NotFound';
import ArtistsList from '../components/MusicPlayer/ArtiststList'
import AlbumList from '../components/MusicPlayer/AlbumList';
import PlayList from '../components/MusicPlayer/PlayList'



const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, 
                //path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "songs",
                element: (
                    <ProtectedRoute>
                        <SongList />
                       
                    </ProtectedRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "album",
                element: <AlbumList />,
            },
            {
                path: "artist",
                element: <ArtistsList />,
            },
            {
                path: "play",
                element: <PlayList />,
            },
           
            
           
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
    ],
    {
        basename: "/music/",
    }
        
    
    
);

export  {Router};
