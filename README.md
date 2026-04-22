# İslamic Chatbot

Bu proje, İslami konularda sohbet edebileceğiniz bir chatbot uygulamasıdır. Google Gemini API kullanılarak geliştirilmiştir ve kullanıcıların İslami bilgilerle etkileşim kurmasını sağlar.

## Proje Hakkında

Bu proje, [Google Gemini API](https://ai.google.dev/gemini) kullanılarak oluşturulmuştur. Temel amacı, kullanıcılara İslami sohbet asistanı olarak hizmet vermektir.

### Kullanılan Teknolojiler

*   **Next.js**: React tabanlı web uygulamaları için bir çerçeve.
*   **TypeScript**: Geliştirme sürecini daha güvenli ve ölçeklenebilir hale getiren tip destekli JavaScript.
*   **Tailwind CSS**: Hızlı ve esnek UI geliştirmesi için bir CSS çerçevesi.
*   **Genkit**: Yapay zeka uygulamaları geliştirmek için kullanılan bir çerçeve.

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda kurmak ve çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/caymazyusuf72/islamic-chatbot.git
    cd islamic-chatbot
    ```

2.  **Bağımlılıkları Yükleyin:**

    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **Environment Değişkenlerini Ayarlayın:**

    Projenin kök dizininde `.env.local` dosyası oluşturun (`.env.example` dosyasını kopyalayabilirsiniz):

    ```bash
    cp .env.example .env.local
    ```

    Ardından `.env.local` dosyasını açın ve Google Gemini API anahtarınızı ekleyin:

    ```plaintext
    GOOGLE_API_KEY=your_actual_api_key_here
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

    **API Anahtarı Nasıl Alınır:**
    - <mcurl name="Google AI Studio" url="https://aistudio.google.com/app/apikey"></mcurl> adresine gidin
    - Google hesabınızla giriş yapın
    - "Create API Key" butonuna tıklayın
    - Oluşturulan API anahtarını kopyalayın ve `.env.local` dosyasına yapıştırın

    **Önemli:** `.env.local` dosyası `.gitignore` tarafından otomatik olarak göz ardı edilir, bu nedenle API anahtarınız asla Git'e commit edilmez.

4.  **Uygulamayı Başlatın:**

    ```bash
    npm run dev
    # veya
    yarn dev
    ```

    Uygulama genellikle `http://localhost:3000` adresinde çalışacaktır.

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Her türlü geri bildirim ve iyileştirme önerisi değerlidir.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

