import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  buildEditCategoryRoute,
  RouteAddCategory,
  RouteEditCategory,
} from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch.js";
import { getEnv } from "@/helpers/getEnv.js";
import Loading from "@/components/Loading.jsx";
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Users = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-all-users`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
  
  const users=data?.users;

  const handleDelete = async (id) => {
    const response =await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/user/delete-user/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data deleted");
    } else {
      showToast("error", "Data not deleted.");
    }
  };
  if (loading) return <Loading />;
  return (
    <>
      <div>
        <Card>
          <CardHeader>
            <div>
              <Button asChild>
                <h1 className="text-2xl font-bold bg-violet-500">Users</h1>
              </Button>
            </div>
             <TableCaption className="text-2xl font-semibold">A list of your recent Users.</TableCaption>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
            <Table>
             
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                       <TableCell>
                        <Avatar className="h-9 w-9 cursor-pointer">
                                            <AvatarImage
                                              src={user?.avatar ||  "http://github.com/shadcn.png"}
                                              
                                              className="object-cover"
                                            /></Avatar>
                       </TableCell>
                      <TableCell className="flex gap-3">
                        <Button
                          onClick={() => handleDelete(user._id)}
                          variant="outline"
                          className="hover:bg-violet-600 hover:text-white"
                        >
                          <MdDelete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan="3">Data not found</TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Users;
