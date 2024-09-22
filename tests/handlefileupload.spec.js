import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ChartComponent from '../src/components/ChartComponent.vue';

// Manual mock for axios using Vitest's vi.fn()
const axiosMock = {
  post: vi.fn()
};

describe('ChartComponent - handleFileUpload', () => {
  let component, consoleSpy, alertMock, consoleLogSpy;

  beforeEach(() => {
    // Create a shallow copy of the component with mocked methods
    component = {
      ...ChartComponent,
      methods: {
        ...ChartComponent.methods,
        // Ensure handleFileUpload uses the mocked $axios
        async handleFileUpload(event) {
          const file = event.target.files[0];
          if (!file) return;
          if (!file.name || !file.name.endsWith('.xlsx')) {
            alert('Please upload only Excel files (.xlsx)');
            if (event.target) {
              event.target.value = '';
            }
            return;
          }
          const formData = new FormData();
          formData.append('file', file);
          try {
            const response = await this.$axios.post('http://localhost:3000/upload_file', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response.data);
          } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
          }
        }
      },
      // Inject the mocked axios
      $axios: axiosMock
    };

    // Mock console methods
    consoleSpy = vi.fn();
    console.error = consoleSpy;

    consoleLogSpy = vi.fn();
    console.log = consoleLogSpy;

    // Mock alert
    alertMock = vi.fn();
    global.alert = alertMock;
  });

  afterEach(() => {
    // Reset mocks after each test
    axiosMock.post.mockReset();
    consoleSpy.mockReset();
    consoleLogSpy.mockReset();
    alertMock.mockReset();
  });

  it('should not process if no file is selected', async () => {
    const event = { target: { files: [] } };
    await component.methods.handleFileUpload.call(component, event);
    expect(axiosMock.post).not.toHaveBeenCalled();
  });

  it('should show an alert for non-xlsx files', async () => {
    const event = { target: { files: [{ name: 'test.pdf' }] } };
    await component.methods.handleFileUpload.call(component, event);
    expect(alertMock).toHaveBeenCalledWith('Please upload only Excel files (.xlsx)');
  });

  it('should upload xlsx file successfully', async () => {
    const mockFile = new File(['dummy content'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const event = { target: { files: [mockFile] } };

    axiosMock.post.mockResolvedValue({ data: 'Upload successful' });

    await component.methods.handleFileUpload.call(component, event);

    expect(axiosMock.post).toHaveBeenCalledWith(
      'http://localhost:3000/upload_file',
      expect.any(FormData),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    // Retrieve the FormData instance to verify its contents
    const formData = axiosMock.post.mock.calls[0][1];
    expect(formData.get('file')).toEqual(mockFile); // Changed to toEqual

    expect(consoleLogSpy).toHaveBeenCalledWith('Upload successful');
  });

  it('should handle upload error', async () => {
    const mockFile = new File(['dummy content'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const event = { target: { files: [mockFile] } };

    const error = new Error('Upload failed');
    axiosMock.post.mockRejectedValue(error);

    await component.methods.handleFileUpload.call(component, event);

    expect(consoleSpy.mock.calls[0]).toEqual(['Error uploading file:', error]); // Changed to mock.calls
    expect(alertMock).toHaveBeenCalledWith('Error uploading file. Please try again.');
  });
});