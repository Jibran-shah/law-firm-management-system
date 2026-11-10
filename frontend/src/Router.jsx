import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/Home.page";
import LoginPage from "./pages/authentication/Login.page";
import SignupPage from "./pages/authentication/Signup.page";
import AboutUsPage from "./pages/AboutUs.page";
import BlogsPage from "./pages/blogs/Blogs.page";
import ClientStoriesPage from "./pages/client-stories/ClientStories.page";
import ServicesPage from "./pages/services/Services.page";
import ServicePage from "./pages/services/Service.page"
import DashboardPage from "./pages/Dashboard.page"
import MemberPage from "./pages/members/Member.page";
import CreateMemberPage from "./pages/members/CreateMember.page";
import LawFirmSettingsPage from "./pages/LawFirmSettings.page"
import { apiClient } from "./api/client.api";
import { RootLayout } from "./layouts/RootLayout";
import ClientPage from "./pages/clients/Client.page";
import CreateClientPage from "./pages/clients/CreateClient.page";
import MembersPage from "./pages/members/Members.page";
import CreateBlogPage from "./pages/blogs/CreateBlog.page";

export const firmLoader = async () => {
  const response = await apiClient.get("law-firm");
  return response.data?.data;
};

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const Router = createBrowserRouter([
  {
    id:"root",
    element: <RootLayout />,
    loader:firmLoader,
    children:[
      {
        element:<PublicLayout/>,
        children:[
          {
            path: "/about",
            element: <AboutUsPage />,
          },
          {
            path: "/blogs",
            element: <BlogsPage />,
          },
          {
            path: "/blogs/create",
            element: <CreateBlogPage/>,
          },
          {
            path: "/client-stories",
            element: <ClientStoriesPage />,
          },
          {
            path:"/services",
            element:<ServicesPage/>
          },
          {
            path:"/services/:id",
            element:<ServicePage/>
          },
          {
            path:"/dashboard",
            element:<DashboardPage/>
          },
          {
            path:"/members",
            element:<MembersPage/>
          },
          {
            path:"/members/:id",
            element:<MemberPage/>
          },
          {
            path:"/members/create",
            element:<CreateMemberPage/>
          },
          {
            path:"/client",
            element:<ClientPage/>
          },
          {
            path:"/client/create",
            element:<CreateClientPage/>
          },
          {
            path:"settings",
            element:<LawFirmSettingsPage/>
          },
          {
            path: "*",
            element: <HomePage />,
          },
        ]
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ]
  },
]);

export default Router;