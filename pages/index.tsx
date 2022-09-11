import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Flex,
  Stack
} from '@chakra-ui/react';
import SearchForm from '../components/SearchForm';
import useGetCities from '../hooks/useGetCities';
import { City } from '../models/City';
import { SearchDistanceQuery } from '../models/SearchDistanceQuery';
import { useRouter } from 'next/router';

type HomeParams = {
  cities: { value: string, label: string };
}

const Home: NextPage<HomeParams> = () => {
  const { cities, loading, error } = useGetCities();
  const { push } = useRouter();

  const handleSubmit = (params: SearchDistanceQuery) => {
    push({
      pathname: "/searchResult",
      query: {...params}
    })
  }
  
  return (
    <>
      <Head>
        <title>How far is it - Search</title>
      </Head>

      <Container maxW='xxl' padding={0}>
        <Stack
          as={Box}
          textAlign={'center'}
          paddingTop={{ base: 10 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            How far is it?<br />
            <Text as={'span'} color={'teal'} fontSize={{ base: '4xl', sm: 'sm', md: '4xl' }}>
              Get the travel distance between one or more cities.
            </Text>
          </Heading>
          <Flex
            minW="100%"
            height="100%"
            justify={'center'}
            align="center"
            bg="teal">
              <SearchForm cities={cities} onSubmit={handleSubmit} />
          </Flex>
        </Stack>
      </Container>
    </>
  )
};

export default Home
