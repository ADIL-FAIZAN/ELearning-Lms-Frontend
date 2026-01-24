import { apiSlice } from "./api/apiSlice";



export const courseApi = apiSlice.injectEndpoints({ 

    endpoints: (builder) => ({
    
        // endpoints here
        createCourse: builder.mutation({
    
            query: (data) => ({
    
                url: "course/create-course",
                method: "POST",
                body: data,
                credentials: "include"
    
            }),

            invalidatesTags: [{ type: "Courses", id: "LIST" }],
        }),
        
        getAllCourses: builder.query({
    
            query: (data) => ({
    
                url: "course/get-all-courses",
                method: "GET",
                credentials: "include"
    
            }),
               providesTags: [{ type: "Courses", id: "LIST" }],
        }),


         getSingleCourse: builder.query({
    
            query: (id) => ({
    
                url: `course/get-course/${id}`,
                method: "GET",
                credentials: "include"
    
            }),
                       
        }),


        deleteCourse: builder.mutation({
          
      
        query: (id) => ({
        url: `course/delete-course/${id}`,
        method: "DELETE",
        credentials: "include"

            }),
        invalidatesTags: [{ type: "Courses", id: "LIST" }],
         }),

           editCourse: builder.mutation({
    
               query: ({ courseData, courseId }) => ({
    
                url: `course/edit-course/${courseId}`,
                method: "PUT",
                body: courseData,
                credentials: "include"
    
               }),
               invalidatesTags: [{ type: "Courses", id: "LIST" }],

           }),
           
          
           courseContent: builder.query({
    
               query: ( courseId ) => ({
    
                url: `course/get-course-content/${courseId}`,
                method: "GET",
                credentials: "include"
    
               }),
            

           }),

           addQuestion: builder.mutation({
    
               query: ({ question, courseId, contentId }) => ({
    
                url: "course/add-question",
                method: "PUT",
                body: {
                
                question,
                courseId,
                contentId
            
                },
                credentials: "include"
    
               }),
            
           }),

               addAnswer: builder.mutation({
    
               query: ({ answer, questionId, courseId, contentId }) => ({
    
                url: "course/add-answer",
                method: "PUT",
                body: {
                    
                answer,
                questionId,
                courseId,
                contentId
                
                },
                credentials: "include"
    
               }),
            
           }),

          
            addReview: builder.mutation({
    
               query: ({ courseId,review,rating }) => ({
    
                url: `course/add-review/${courseId}`,
                method: "PUT",
                body: {
                    
                review,
                rating 
                
                },
                credentials: "include"
    
               }),
            
           }),
    
    
              addReviewReply: builder.mutation({
    
               query: ({ review, reviewId, courseId }) => ({
    
                url: `course/admin-review-reply`,
                method: "PUT",
                body: {
                    
                review,
                reviewId,
                courseId 
                
                },
                credentials: "include"
    
               }),
            
           }),
        
        
               AllCoursesData: builder.query({
    
               query: () => ({
    
                url: `course/get-All-Courses-user`,
                method: "GET",
                credentials: "include"
    
               }),
            
           }),      
              
              
              
              
              
      })
});
    
export const { useCreateCourseMutation,useGetAllCoursesQuery,useDeleteCourseMutation,useAllCoursesDataQuery,useEditCourseMutation,useGetSingleCourseQuery,useCourseContentQuery,useAddQuestionMutation,useAddAnswerMutation,useAddReviewMutation,useAddReviewReplyMutation } = courseApi;