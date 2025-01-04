export interface Song {
    _id : string;
    title : string;
    artist : string;
    albumId : string | null;
    imageUrl : string;
    audioUrl : string;
    duration : number;
    createdAt : string;
    updatedAt : string;
}

export interface Album{
    _id : string;
    title : string;
    artist : string;
    releaseYear : number;
    imageUrl : string;
    songs : Song[]
}

export interface Stats {
    totalSongs : number;
    totalAlbums : number;
    totalUsers : number;
    totalArtists : number;
}

export interface User{
    _id : string;
    fullName: string;
    ClerkId : string;
    imageUrl : string
}

export interface Message {
    _id : string;
    text : string;
    senderId : string;
    recieverId : string;
    createdAt : string;
    updatedAt : string;
}