// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  AppLayout,
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Header,
  Box,
  SpaceBetween,
  Link,
  TextContent,
  ColumnLayout,
} from '@cloudscape-design/components';
import { Navigation, Notifications } from '../commons/common-components';
import { appLayoutAriaLabels } from '../../i18n-strings';
import * as awsui from '@cloudscape-design/design-tokens';

import '../../styles/base.scss';

const Breadcrumbs = () => (
  <BreadcrumbGroup
    items={[
      {
        text: 'AWS Marketplace',
        href: '#',
      },
      {
        text: 'Software as a service',
        href: '#',
      },
      {
        text: 'Trend Micro Cloud One',
        href: '#',
      },
    ]}
    expandAriaLabel="Show path"
    ariaLabel="Breadcrumbs"
  />
);

function Marketplace() {
  return (
    <ColumnLayout columns={2}>
      <TextContent>
        <SpaceBetween size="m">
          <p>
            Free trials and free tiers: Subscribe to Trend Micro Cloud One today and create a new Cloud One account to
            receive a 30 day free trial of all Cloud One services. Before the end of your 30 day trial, get in touch
            with Trend Micro for custom pricing and licensing next steps or automatically use our metered billing, or
            start with our free tiers. See more on our free tiers in the resources section!
          </p>

          <p>
            Trend Micro Cloud One is THE complete cloud security services platform for organizations innovating on AWS.
            With 7 unique services, we know it can...
          </p>
          <section>
            <Header variant="h3" info={<Link variant="info">Info</Link>}>
              Product details
            </Header>
            <ColumnLayout columns={2} borders="horizontal">
              <Box color="text-body-secondary">Sold by</Box>
              <Link href="#" external>
                Trend micro
              </Link>
              <Box color="text-body-secondary">Product type</Box>
              <Box>Software as a service (Saas)</Box>
            </ColumnLayout>
          </section>
          <section>
            <Header variant="h3" info={<Link variant="info">Info</Link>}>
              Vendor insights
            </Header>
            <p>
              The current version of this product contains a security profile and has acquired the certifications below.{' '}
              <Link href="#" external>
                View all profiles for this product
              </Link>{' '}
            </p>
            <SpaceBetween size="xs" direction="horizontal">
              <div style={{ height: '100px', width: '100px', background: awsui.colorDragPlaceholderActive }} />
              <div style={{ height: '100px', width: '100px', background: awsui.colorDragPlaceholderActive }} />
            </SpaceBetween>
          </section>
        </SpaceBetween>
      </TextContent>
      <SpaceBetween size="m">
        <div style={{ height: '300px', width: '100%', background: awsui.colorDragPlaceholderActive }} />
        <section>
          <Header variant="h3">Highlights</Header>
          <ul>
            <li>
              Broad security coverage through one easy-to-use platform from industry leading cybersecurity expert, Trend
              Micro. COMPLETE cloud security simplified. Try the free trial today!
            </li>
            <li>
              Gain instant visibility into your entire environment, and meet your PCI-DSS and regulatory compliance
              requirements
            </li>
            <li>
              Security for Amazon S3 while retaining data sovereignty, regardless of file size or type! Try File Storage
              Security
            </li>
          </ul>
        </section>
      </SpaceBetween>
    </ColumnLayout>
  );
}

function Content() {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description={
            <SpaceBetween direction="horizontal" size="l">
              <div>
                Get started quickly and for free today with anti-malware for Amazon S3 with File Storage Security, Cloud
                Security Posture Management with and Well Architected resources in Conformity, or with EC2 protection
                with Workload Security!
                <SpaceBetween direction="horizontal" size="xs">
                  <Link href="#" variant="primary">
                    20 AWS Reviews
                  </Link>
                  <div>|</div>
                  <Link href="#" variant="primary">
                    123 External Reviews
                  </Link>
                </SpaceBetween>
              </div>
            </SpaceBetween>
          }
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button variant="primary">View purchasing options</Button>
              <Button>Try for free</Button>
            </SpaceBetween>
          }
        >
          Trend Micro Cloud One
        </Header>
      }
    >
      <Container header={<Header variant="h2">Product Overview</Header>}>
        <Marketplace />
      </Container>
    </ContentLayout>
  );
}

function App() {
  return (
    <AppLayout
      contentType="form"
      content={<Content />}
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref="#/distributions" />}
      ariaLabels={appLayoutAriaLabels}
      toolsHide={true}
      // notifications={<Notifications />}
    />
  );
}

createRoot(document.getElementById('app')).render(<App />);
