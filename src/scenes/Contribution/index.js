import { Typography } from '@mui/material'

function Contribution() {
  return (
    <>
      <Typography variant="h4">
        How to contribute
      </Typography>
      <Typography className="mt-4">
        To add more words:
      </Typography>
      <Typography
        className="mt-2"
        component="div"
      >
        <ol>
          <li>
            Create a
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-0h"
            >
              Github
            </a>
            account.
          </li>
          <li>
            Click on the pen icon in the top right corner of
            <a
              href="https://github.com/dherault/language-study-companion/blob/main/src/data.js"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-0h"
            >
              this page
            </a>
            .
          </li>
          <li>
            Submit your work for review.
          </li>
        </ol>
      </Typography>
      <Typography className="mt-2">
        That's it!
      </Typography>
      <Typography className="mt-2">
        Contact: dherault@gmail.com
      </Typography>
    </>
  )
}

export default Contribution
