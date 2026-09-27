import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ButtonComponent } from './button.component';

const meta = {
  component: ButtonComponent,
} satisfies Meta<ButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
