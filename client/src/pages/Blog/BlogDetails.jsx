import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from 'react-router-dom';
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName.js';
import Loading from '@/components/Loading.jsx';
import { showToast } from '@/helpers/showToast.js';
import { useFetch } from '@/hooks/useFetch.js';
import { getEnv } from '@/helpers/getEnv.js';
import { deleteData } from '@/helpers/handleDelete.js';
import { MdDelete, MdOutlineEditCalendar } from 'react-icons/md';

const BlogDetails = () => {
  const [refreshData, setRefreshData]=useState(false);
    const {data:blogData,loading,error}=useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`,{
      method:"get",
      credentials:"include"
    },[refreshData]);
   
    const handleDelete=(id)=>{
      const response=deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`);
      if(response){
        setRefreshData(!refreshData);
        showToast('success','Data deleted');

      }
      else{
        showToast('error',"Data not deleted.");
      }
  
    }
    
    if(loading) return <Loading/>
  return (
     <>
      <div>
         <Card>
          <CardHeader>
            <div>
              <Button asChild>
                <Link to={RouteBlogAdd}>Add Blog</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              
              <TableHeader>
                <TableRow>
                   <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Dated</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogData && blogData.blog.length>0 ?
                
                blogData.blog.map(blog=>
                  <TableRow key={blog._id}>
                    <TableCell>
                    {blog?.author?.name}
                  </TableCell>
                  <TableCell>
                    {blog?.category?.name}
                  </TableCell>
                  <TableCell>
                    {blog?.title}
                  </TableCell>
                  <TableCell>
                    {blog?.slug}
                  </TableCell>
                  <TableCell>
                    {new Date(blog?.updatedAt).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className="flex gap-3">
                    <Button variant="outline" asChild className="hover:bg-violet-600 hover:text-white">
                      <Link to={RouteBlogEdit(blog._id)}>
                      <MdOutlineEditCalendar/>
                      </Link>
                    </Button> 

                     <Button onClick={()=>handleDelete(blog._id)} variant="outline" className="hover:bg-violet-600 hover:text-white">
                      <MdDelete/>
                      
                     
                    </Button> 
                    

                  </TableCell>
                
                </TableRow>
                )
                
                
                :
                
                <>
                <TableRow>
                  <TableCell colSpan="3">
                     Data not found
                  </TableCell>
                </TableRow>
                </>
                }
               
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default BlogDetails
