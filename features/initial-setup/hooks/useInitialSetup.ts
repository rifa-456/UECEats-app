import { useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useToast } from '@/providers/ToastProvider';
import mime from 'mime';
import {config} from "@/utils/config";
import {strapiSdk} from "@/api/strapi-client";

export const useInitialSetup = () => {
  const { user, completeSetup } = useAuthStore();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      nomeCompleto: user?.username || '',
      avatar: user?.avatar || null,
      matricula: '',
      isQuerendoSerEntregador: false,
    },
  });

  /**
     * Handles picking an image from the media library and updating the form state.
     * This logic now lives entirely within the hook.
     */
  const handleProfilePictureChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showToast({
        type: 'error',
        message: 'Permissão da Galeria negada.',
      });
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        setValue('avatar', result.assets[0].uri, { shouldDirty: true });
      }
    } catch (error) {
      showToast({ type: 'error', message: 'Não foi possível abrir a galeria.' });
    }
  };

  /**
     * Handles the final submission of the multi-step form, including file upload.
     */
  const handleFinalSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const uploadAvatarFormData = new FormData();
      const file = {
        uri: formData.avatar,
        type: mime.getType(formData.avatar),
        name: `profile_${user?.id}_${Date.now()}.jpg`,
      };
      uploadAvatarFormData.append('files', file);
      const uploadUrl = `${config.strapiBaseUrl}/api/upload`;
      const headers = {
        Authorization: `Bearer ${useAuthStore.getState().jwt}`,
      };
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: headers,
        body: uploadAvatarFormData,
      });
      const responseData = await response.json();
      const userId = user?.id.toString() as string;
      const userUrl = `${config.strapiBaseUrl}/api/users/${userId}`;
      await fetch(userUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          avatar: responseData[0].id,
          username: formData.nomeCompleto,
          numeroVinculoUECE: formData.matricula.toString(),
        }),
      });
      await strapiSdk.create('estudantes', {
        usuario: useAuthStore.getState().user?.documentId,
        isQuerendoSerEntregador: formData.isQuerendoSerEntregador,
      });
      completeSetup();
      showToast({ type: 'success', message: 'Setup complete! Welcome.' });
      router.replace('/(app)');
    } catch (error: any) {
      showToast({ type: 'error', message: error.message || 'Failed to save your information.' });
    } finally {
      setIsLoading(false);
    }
  };
  return {
    control,
    handleSubmit,
    handleFinalSubmit,
    isLoading,
    user,
    handleProfilePictureChange,
  };
}; 