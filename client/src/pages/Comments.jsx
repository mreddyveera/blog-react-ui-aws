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

const Comments = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: comments,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response =await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/comment/delete-comment/${id}`
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
                <h1 className="text-2xl font-bold bg-violet-500">Comments</h1>
              </Button>
            </div>
             <TableCaption className="text-2xl font-semibold">A list of your recent Comments.</TableCaption>
          </CardHeader>

          <CardContent>
            
            <Table>
             
              <TableHeader>
                <TableRow>
                  <TableHead>Blog</TableHead>
                  <TableHead>Commented By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments && comments.comments.length > 0 ? (
                  comments.comments.map((comment) => (
                    <TableRow key={comment._id}>
                      <TableCell>{comment.blogid.title}</TableCell>
                      <TableCell>{comment.user.name}</TableCell>
                      <TableCell>
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-IN"
                        )}
                      </TableCell>
                      <TableCell>{comment.comment}</TableCell>
                      <TableCell className="flex gap-3">
                        <Button
                          onClick={() => handleDelete(comment._id)}
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
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Comments;
