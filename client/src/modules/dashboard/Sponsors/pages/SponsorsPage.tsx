import { VStack, Flex, Heading, Text } from '@chakra-ui/react';
import { DataTable } from 'chakra-data-table';
import { LinkButton } from 'chakra-next-link';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Layout } from '../../shared/components/Layout';
import { useSponsorsQuery } from 'generated/graphql';

export const SponsorsPage: NextPage = () => {
  const { loading, error, data } = useSponsorsQuery();

  return (
    <>
      <Head>
        <title>Sponsors</title>
      </Head>
      <Layout>
        <VStack>
          <Flex w="full" justify="space-between">
            <Heading id="page-heading">Sponsors</Heading>
            <LinkButton href="/dashboard/sponsors/new">Add new</LinkButton>
          </Flex>
          {loading ? (
            <Heading> Loading Sponsors...</Heading>
          ) : error || !data?.sponsors ? (
            <>
              <Heading>Error while loading sponsors</Heading>
              <Text>
                {error?.name}:{error?.message}
              </Text>
            </>
          ) : (
            <DataTable
              tableProps={{ table: { 'aria-labelledby': 'page-heading' } }}
              data={data.sponsors}
              keys={['name', 'type', 'website', 'actions'] as const}
              mapper={{
                name: (sponsor) => (
                  <LinkButton href={`/dashboard/sponsors/${sponsor.id}`}>
                    {sponsor.name}
                  </LinkButton>
                ),
                type: (sponsor) => sponsor.type,
                website: (sponsor) => sponsor.website,
                actions: (sponsor) => (
                  <LinkButton
                    colorScheme="green"
                    size="xs"
                    href={`/dashboard/sponsors/${sponsor.id}/edit`}
                  >
                    Edit
                  </LinkButton>
                ),
              }}
            />
          )}
        </VStack>
      </Layout>
    </>
  );
};
