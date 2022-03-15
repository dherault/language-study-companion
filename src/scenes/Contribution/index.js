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
            &nbsp;
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            &nbsp;
            account.
          </li>
        </ol>
      </Typography>
    </>
  )
}

export default Contribution
