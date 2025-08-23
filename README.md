# İslamic Chatbot

Bu proje, İslami konularda sohbet edebileceğiniz bir chatbot uygulamasıdır. Google Gemini API kullanılarak geliştirilmiştir ve kullanıcıların İslami bilgilerle etkileşim kurmasını sağlar.

## Proje Hakkında

Bu proje, <mcurl name="Google Gemini API" url="https://ai.google.dev/gemini"></mcurl> kullanılarak oluşturulmuştur. Temel amacı, kullanıcılara İslami sohbet asistanı olarak hizmet vermektir.

### Kullanılan Teknolojiler

*   **Next.js**: React tabanlı web uygulamaları için bir çerçeve.
*   **TypeScript**: Geliştirme sürecini daha güvenli ve ölçeklenebilir hale getiren tip destekli JavaScript.
*   **Tailwind CSS**: Hızlı ve esnek UI geliştirmesi için bir CSS çerçevesi.
*   **Genkit**: Yapay zeka uygulamaları geliştirmek için kullanılan bir çerçeve.

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda kurmak ve çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/your-repo/islamic-chatbot.git
    cd islamic-chatbot
    ```

2.  **Bağımlılıkları Yükleyin:**

    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **Gemini API Anahtarını Ayarlayın:**

    Projenin kök dizininde (`c:\Users\yusuf\Desktop\studio-master`) `.env` adında yeni bir dosya oluşturun ve içine Gemini API anahtarınızı ekleyin:

    ```plaintext
    GEMINI_API_KEY=BURAYA_KENDİ_GEMINI_API_ANAHTARINIZI_GİRİN
    ```

    `BURAYA_KENDİ_GEMINI_API_ANAHTARINIZI_GİRİN` kısmını kendi gerçek Gemini API anahtarınızla değiştirmeyi unutmayın. Anahtarınızı <mcurl name="Google AI Studio" url="https://aistudio.google.com/app/apikey"></mcurl> adresinden alabilirsiniz.

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

