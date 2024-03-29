import SvgIcon from "@mui/material/SvgIcon";
import CorpName from '../../assets/images/logo_1.svg'
import Link from './Link'

const IconCorpName = (props) =>
    <Link href="/"
        sx={{ display: 'flex', alignItems: 'flex-end' }}
    >
        <SvgIcon component={CorpName} {...props} />
    </Link>

export default IconCorpName