import { Stack } from "@mui/material"
import { Container } from "@mui/system"
import BikeCard from "../../components/BikeCard"
import Layout from "../../components/layouts/Layout"
import { categories } from "../../lib/utils/temp"
import { getBikes } from "../api/bikes/getBikes"

const BikesCategoryPage = ({ bikes }) => {

    return (
        <Layout>
            <Container>
                <Stack
                    alignItems='center'
                    spacing={2}
                >
                    {bikes.map(bike => <BikeCard key={bike._id} bike={bike}></BikeCard>
                    )}

                </Stack>
            </Container>
        </Layout>


    )

}


export default BikesCategoryPage

export async function getStaticPaths() {
    const paths = categories.map(category => ({ params: { category: category } }))
    return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context) {
    //CATEGORIAS
    const { params: filter } = context
    console.log('PARAMS', filter)
    const res = await getBikes(filter)
    const bikes = JSON.parse(JSON.stringify(res))
    console.log('CATEGORIES', bikes)
    return {
        props: { bikes }, // will be passed to the page component as props
        //  revalidate: 1
    }
}