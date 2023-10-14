import { pluralizeUk } from '@/common'
import { LocaleType } from '@/components/translation'

export const uk: LocaleType = {
  navBar: {
    home: 'Головна сторінка',
    create: 'Створити',
    myProfile: 'Мій профіль',
    messenger: 'Месенджер',
    search: 'Пошук',
    statistics: 'Статистика',
    favorites: 'Обране',
    logout: 'Вийти',
  },
  confirm: {
    buttonYes: 'Так',
    buttonNo: 'Ні',
  },
  profile: {
    profilePage: {
      buttonProfileSettings: 'Налаштування профілю',
      following: 'Підписки',
      followers: 'Підписники',
      getCountFollower(count: number) {
        const str = pluralizeUk(count)

        switch (str) {
          case 'one':
            return `${count} підписник`
          case 'few':
            return `${count} підписника`
          case 'many':
            return `${count} підписників`
        }
      },

      getCountFollowing(count: number) {
        const str = pluralizeUk(count)

        switch (str) {
          case 'one':
            return `${count} підписка`
          case 'few':
            return `${count} підписки`
          case 'many':
            return `${count} підписок`
        }
      },
      getCountFollowerPage(count: number) {
        const str = pluralizeUk(count)

        switch (str) {
          case 'one':
            return `Підписник`
          case 'few':
            return `Підписника`
          case 'many':
            return `Підписників`
        }
      },

      getCountFollowingPage(count: number) {
        const str = pluralizeUk(count)

        switch (str) {
          case 'one':
            return `Підписка`
          case 'few':
            return `Підписки`
          case 'many':
            return `Підписок`
        }
      },
      getCountPublicationPage(count: number): string | undefined {
        const str = pluralizeUk(count)

        switch (str) {
          case 'one':
            return `Публікація`
          case 'few':
            return 'Публікації'
          case 'many':
            return 'Публікацій'
        }
      },
      delete: 'Видалити',
      Publications: 'Публікації',
      confirmTitleDeleteFollowing: 'Видалити підписку',
      confirmDescriptionDeleteFollowing: 'Ви дійсно бажаєте видалити підписку на ',
    },
    settingsProfile: {
      settingsProfileTabs: {
        generalInformation: 'Загальна інформація',
        devices: 'Пристрої',
        accountManagement: 'Керування обліковим записом',
        myPayments: 'Мої платежі',
      },
      generalInformation: {
        errors: {
          userName: "Ім'я користувача є обов'язковим",
          dateOfBirthMax: 'Дата народження не може бути у майбутньому',
          dateOfBirthTypeError: 'Дата народження повинна бути коректною датою',
          aboutMe: 'Не може перевищувати 200 символів',
        },
        userName: "Ім'я користувача",
        firstName: "Ім'я",
        lastName: 'Прізвище',
        dateOfBirthday: 'Дата народження',
        city: 'Місто',
        aboutMe: 'Про мене',
        buttonSaveChanges: 'Зберегти зміни',
      },
      devices: {},
    },
  },
  userProfile: {
    buttonMessage: 'Надіслати повідомлення',
    buttonFollow: 'Підписатися',
    buttonUnfollow: 'Відписатися',
  },
  search: {
    searchTitle: 'Пошук',
    searchInput: 'Пошук',
    recentRequests: 'Останні запити',
    noRequests: 'Немає останніх запитів',
    placeEmpty: 'Ой! Тут виглядає порожньо!',
  },
  likes: {
    getCountTitleLikes(count: number) {
      const str = pluralizeUk(count)

      switch (str) {
        case 'other':
          return `${count} Подобається`
        case 'one':
          return `${count} Подобається`
        case 'few':
          return `${count} Подобається`
        case 'many':
          return `${count} Подобається`
      }
    },
    getCountLikes(count: number): string | undefined {
      const str = pluralizeUk(count)

      switch (str) {
        case 'other':
          return 'Подобається'
        case 'one':
          return `Подобається`
        case 'few':
          return `Подобається`
        case 'many':
          return `Подобається`
      }
    },
  },
  homepage: {
    viewComments: 'Переглянути всі коментарі',
  },
  addCommentForm: {
    addComment: 'Додати коментар...',
    addAnswer: 'Додати відповідь...',
    publish: 'Опублікувати',
  },
  postActions: {
    follow: 'Підписатися',
    unFollow: 'Відписатися',
    deletePost: 'Видалити пост',
    editPost: 'Редагувати пост',
    report: 'Поскаржитися',
  },
  PostCommentAnswers: {
    answer: 'Відповідь',
    getCountShowAnswers(count: number) {
      const str = pluralizeUk(count)

      switch (str) {
        case 'other':
          return `Показати відповіді (${count})`
        case 'one':
          return `Показати відповідь (${count})`
        case 'few':
          return `Показати відповіді (${count})`
        case 'many':
          return `Показати відповіді (${count})`
      }
    },
    getCountHideAnswers(count: number): string | undefined {
      const str = pluralizeUk(count)

      switch (str) {
        case 'other':
          return `Сховати відповіді (${count})`
        case 'one':
          return `Сховати відповідь (${count})`
        case 'few':
          return `Сховати відповіді (${count})`
        case 'many':
          return `Сховати відповіді (${count})`
      }
    },
  },
  auth: {
    signUp: 'Зареєструватися',
    singIn: 'Увійти',
    email: 'Електронна пошта',
    password: 'Пароль',
    confirm: {
      ok: 'ОК',
      titleEmail: 'Лист надіслано',
      text: 'Ми надіслали посилання для підтвердження вашої електронної пошти',
    },
    login: {
      title: 'Вхід',
      forgotPassword: 'Забули пароль?',
      haveAccount: 'Немає облікового запису?',
      errors:
        "Неправильний пароль, електронна пошта або ім'я користувача. Будь ласка, спробуйте знову.",
    },
    registration: {
      title: 'Зареєструватися',
      userName: `Ім'я користувача`,
      email: 'Електронна пошта',
      password: 'Пароль',
      passwordConfirmation: 'Підтвердження пароля',
      confirmationMessage: 'Не отримали підтвердження?',
      haveAccount: 'У вас є обліковий запис?',
      errors: {
        userName: {
          required: 'Поле "Ім\'я користувача" обов\'язкове для заповнення',
          min: 'Мінімальна кількість символів - 6',
          max: 'Максимальна кількість символів - 30',
        },
        email: {
          required: 'Поле "Email" обов\'язкове для заповнення',
          email: 'електронна пошта повинна бути дійсною',
        },
        password: {
          min: 'Мінімальна кількість символів - 6',
          max: 'Пароль повинен містити не більше 20 символів',
        },
        confirmPassword: {
          min: 'Мінімальна кількість символів - 6',
          max: 'Пароль повинен містити не більше 20 символів',
          password: 'Паролі не збігаються',
        },
      },
      resendForm: {
        title: 'Форма повторного надсилання',
        resendLink: 'Надіслати повторно посилання для верифікації',
        email: 'Електронна пошта',
        send: 'Надіслати',
        error: {
          email: `Email є обов'язковим полем`,
        },
      },
      externalAccount: {
        titlePage: 'Зовнішній обліковий запис',
        title: `Об'єднання облікових записів`,
        description: (email: string): string =>
          `Користувач з електронною поштою:${email} вже зареєстрований в системі. Чи можемо ми об'єднати ці облікові записи?`,
        buttonYes: `Так, об'єднати`,
        buttonNo: 'ні',
        modalConfirm: { title: `Об'єднання облікових записів`, buttonOk: 'Ок' },
      },
    },
    forgotPassword: {
      title: 'Забули пароль',
      backToSignIn: 'Повернутися до Входу',
      description: 'Введіть вашу електронну адресу, і ми надішлемо вам дальші інструкції',
      buttonSend: 'Надіслати інструкції',
      modal: {
        title: 'Лист надіслано',
        text: {
          getDescription(email: string | undefined) {
            return `Посилання було надіслано на вашу електронну пошту ${email}. Якщо ви не отримали листа, надішліть посилання ще раз.`
          },
        },
      },
      error: { required: `Поле Email є обов'язковим`, email: 'Недійсний формат Email' },
    },
    registrationConfirmation: {
      emailSuccessMessage: {
        headTitle: 'Підтвердження Email',
        title: 'Вітаємо!',
        description: 'Ваш email було підтверджено',
        signIn: 'Увійти',
      },
      ResendingVerificationLink: {
        headTitle: 'Термін дії посилання для підтвердження Email минув',
        title: 'Термін дії посилання для підтвердження Email минув',
        description:
          'Здається, що термін дії посилання для підтвердження минув. Не хвилюйтесь, ми можемо відправити посилання ще раз',
        resendLink: 'Відправити посилання ще раз',
      },
    },
    recovery: {
      resendForm: {
        headTitle: 'Відправка повторного підтвердження відновлення пароля',
      },
      headTitle: 'Відновлення пароля',
      createNewPasswordPage: {
        title: 'Створення нового пароля',
        password: 'Новий пароль',
        passwordConfirmation: 'Підтвердження пароля',
        descriptionPassword: 'Ваш пароль повинен містити від 6 до 20 символів',
        button: 'Створити новий пароль',
        error: {
          password: {
            min: 'Мінімальна кількість символів - 6',
            max: 'Пароль повинен містити не більше 20 символів',
          },
          confirmPassword: {
            min: 'Мінімальна кількість символів - 6',
            max: 'Пароль повинен містити не більше 20 символів',
            password: 'Паролі не співпадають',
          },
        },
      },
    },
  },
  statistics: {
    tabsTitle: {
      week: 'Тиждень',
      month: 'Місяць',
    },
    pagesTitle: {
      title: 'Статистика',
      likes: 'Лайки',
      comments: 'Коментарі',
      publication: 'Перегляди публікації',
    },
    popUp: {
      getCountTitleLikes(count: number) {
        const str = pluralizeUk(count)

        switch (str) {
          case 'other':
            return `${count} Лайків`
          case 'one':
            return `${count} Лайк`
          case 'few':
            return `${count} Лайки`
          case 'many':
            return `${count} Лайків`
        }
      },
      getCountTitleComments(count: number) {
        const str = pluralizeUk(count)

        switch (str) {
          case 'other':
            return `${count} Коментарів`
          case 'one':
            return `${count} Коментар`
          case 'few':
            return `${count} Коментарі`
          case 'many':
            return `${count} Коментарів`
        }
      },
      getCountTitlePublication(count: number) {
        const str = pluralizeUk(count)

        switch (str) {
          case 'other':
            return `${count} Переглядів публікації`
          case 'one':
            return `${count} Перегляд публікації`
          case 'few':
            return `${count} Перегляди публікації`
          case 'many':
            return `${count} Переглядів публікації`
        }
      },
    },
  },
}
