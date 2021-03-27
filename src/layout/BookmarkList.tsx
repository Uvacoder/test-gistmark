import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core"
import { BookmarkCard } from "~/components/BookmarkCard"
import {
  BookmarkContext,
  EditorStateContext,
  LayoutContext,
  ViewContext,
} from "~/context"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

interface Props {
  readonly?: boolean
}

export const BookmarkListViewOnly: React.FC = () => {
  const viewContext = useContext(ViewContext)
  const classes = useStyles()

  const bookmarkKeys = Object.keys(viewContext.bookmarks)

  return (
    <div className={classes.root}>
      {bookmarkKeys.map((key) => {
        const bookmarkData = viewContext.bookmarks[key]
        return (
          <BookmarkCard
            key={key}
            guid={key}
            name={bookmarkData.name}
            href={bookmarkData.href}
            description={bookmarkData.description}
            category={bookmarkData.category}
            readonly={true}
          />
        )
      })}
    </div>
  )
}

export const BookmarkList: React.FC<Props> = ({ readonly }) => {
  const classes = useStyles()
  const editorStateContext = useContext(EditorStateContext)
  const bookmarkContext = useContext(BookmarkContext)
  const layoutContext = useContext(LayoutContext)

  const bookmarkKeys = Object.keys(bookmarkContext.bookmarks)

  const handleEditBookmark = (bookmarkGuid: string) => {
    const bookmark = bookmarkContext.bookmarks[bookmarkGuid]
    if (bookmark) {
      editorStateContext.setAllFields({
        guid: bookmarkGuid,
        name: bookmark.name,
        href: bookmark.href,
        description: bookmark.description,
        category: bookmark.category,
      })
      layoutContext.openEditPanel()
    }
  }

  const handleDeleteBookmark = (guid: string) => {
    bookmarkContext.removeBookmark(guid)
  }

  return (
    <div className={classes.root}>
      {bookmarkKeys.map((key) => {
        const bookmarkData = bookmarkContext.bookmarks[key]
        return (
          <BookmarkCard
            key={key}
            guid={key}
            name={bookmarkData.name}
            href={bookmarkData.href}
            description={bookmarkData.description}
            category={bookmarkData.category}
            readonly={readonly}
            onEdit={handleEditBookmark}
            onDelete={handleDeleteBookmark}
          />
        )
      })}
    </div>
  )
}
