import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";
// import 'react-native-url-polyfill/auto';

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.kb.aora",
  projectId: "67639a76003e12ce470f",
  databaseId: "67639b7700125e1ffb41",
  userCollectionId: "67639b8e00005cd26539",
  videosCollectionId: "67639ba30014f4d7f4e0",
  storageId: "67639cb30034f8ede2d2",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )

    if(!newAccount) {
      throw new Error('Failed to create user');
    }

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), 
    {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
    })

    return newUser;

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }

};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    
    if(!currentAccount) {
      throw new Error('Failed to get current account');
    }

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    
    )

    if(!currentUser) {
      throw new Error('Failed to get current user');
    }

    return currentUser.documents[0];

  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}