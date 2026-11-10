import { Box } from "@mui/material"
import RenderContentTree from "../../components/contentManagement/renderTree/RenderContentTree"
import { useId } from "react"
import { contentTreeTypeEnums } from "../../constants/contentTree.constants"


const BlogPage = () => {
  const id = useId()
  return (
    <Box>
      <RenderContentTree node={{
        id,
        type:contentTreeTypeEnums.LAYOUT,
        data:{
          styles:{
            p:"10px"
          },
          direction:"row",
          spacing:"16px"
        },
        children:[{
          id,
          type:contentTreeTypeEnums.TYPOGRAPHY,
          data:{
            text:"this is heading",
            styles:{
              backgroundColor:"red"
            },
            variant:"h1"
          }
        },
        {
          id:"1",
          type:contentTreeTypeEnums.IMAGE,
          data:{
            src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81bNIEaGCzdwl2QV5sIrD4JXpsyk1smkr4psQ6MhDvA8lGy5_6Y4sEyk&s=10",
            styles:{
              backgroundColor:"red"
            },
          }
        }
      ]
      }}/>
    </Box>
  )
}

export default BlogPage