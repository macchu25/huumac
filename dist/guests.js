// Route configurations for shared and personalized graduation invitations
export const routes = {
  '': {
    slug: '',
    title: 'Thư mời Lễ tốt nghiệp · Mạc Như Hữu',
    recipient: 'Thân mời mọi người',
    envelopeRecipient: 'THÂN GỬI MỌI NGƯỜI',
    introTitle: 'Niềm vui này, <br>muốn có <em>mọi người.</em>',
    introLead: 'Hữu thân mời mọi người đến chung vui<br>trong ngày tốt nghiệp của mình.',
    graduate: 'Mạc Như Hữu',
    message: 'Cảm ơn mọi người đã là một phần của hành trình.<br>Mong được cùng mọi người lưu giữ khoảnh khắc này.',
    signoff: 'Hẹn gặp mọi người trong ngày đặc biệt này!',
    journeyArrival: 'Thân mời tất cả mọi người cùng chung vui!',
    hasJourney: true
  },
  'ngocmai': {
    slug: 'ngocmai',
    title: 'Thư mời Lễ tốt nghiệp · Mời bạn Ngọc',
    recipient: 'Mời bạn Ngọc',
    envelopeRecipient: 'THÂN GỬI BẠN NGỌC',
    introTitle: 'Niềm vui này, <br>muốn có <em>bạn Ngọc.</em>',
    introLead: 'Hữu mời bạn Ngọc đến chung vui<br>trong ngày tốt nghiệp của mình.',
    graduate: 'Mạc Như Hữu',
    message: 'Cảm ơn Ngọc đã là một phần thanh xuân đáng nhớ.<br>Rất mong được cùng bạn lưu giữ khoảnh khắc này!',
    signoff: 'Hẹn gặp bạn Ngọc trong ngày đặc biệt này!',
    journeyArrival: '',
    hasJourney: false // Mở thư trực tiếp, không có hành trình
  },
  'nhanoi': {
    slug: 'nhanoi',
    title: 'Kính mời Nhà Nội dự Lễ tốt nghiệp · Mạc Như Hữu',
    recipient: 'Kính mời Nhà Nội',
    envelopeRecipient: 'KÍNH GỬI NHÀ NỘI',
    introTitle: 'Con kính mời <br><em>Nhà Nội.</em>',
    introLead: 'Con kính mời Nhà Nội dự lễ tốt nghiệp của con,<br>đến chung vui cùng con trong ngày đặc biệt.',
    graduate: 'Con: Mạc Như Hữu',
    message: 'Con kính mời Nhà Nội dự tốt nghiệp của con.<br>Cảm ơn ông bà, cô chú, bác và cả nhà đã luôn yêu thương và dõi theo con.',
    signoff: 'Con hẹn gặp cả nhà trong ngày tốt nghiệp!',
    journeyArrival: 'Con kính mời Nhà Nội dự tốt nghiệp của con!',
    hasJourney: true
  },
  'nhangoai': {
    slug: 'nhangoai',
    title: 'Kính mời Nhà Ngoại dự Lễ tốt nghiệp · Mạc Như Hữu',
    recipient: 'Kính mời Nhà Ngoại',
    envelopeRecipient: 'KÍNH GỬI NHÀ NGOẠI',
    introTitle: 'Con kính mời <br><em>Nhà Ngoại.</em>',
    introLead: 'Con kính mời Nhà Ngoại dự lễ tốt nghiệp của con,<br>đến chung vui cùng con trong ngày đặc biệt.',
    graduate: 'Con: Mạc Như Hữu',
    message: 'Con kính mời Nhà Ngoại dự tốt nghiệp của con.<br>Cảm ơn ông bà, các bác, các cô chú đã luôn ủng hộ, yêu thương và đồng hành cùng con.',
    signoff: 'Con hẹn gặp cả nhà trong ngày tốt nghiệp!',
    journeyArrival: 'Con kính mời Nhà Ngoại dự tốt nghiệp của con!',
    hasJourney: true
  },
  'vanhoa': {
    slug: 'vanhoa',
    title: 'Thư mời Lễ tốt nghiệp · Nhóm anh em Văn Hóa',
    recipient: 'Mời nhóm anh em văn hoá',
    envelopeRecipient: 'GỬI ANH EM VĂN HÓA',
    introTitle: 'Niềm vui này, <br>muốn có <em>anh em.</em>',
    introLead: 'Hữu mời nhóm anh em văn hoá đến chung vui<br>trong ngày tốt nghiệp của mình.',
    graduate: 'Mạc Như Hữu',
    message: 'Mời nhóm anh em văn hoá đến chung vui ngày tốt nghiệp!<br>Cảm ơn anh em đã luôn kề vai sát cánh suốt những năm tháng qua.',
    signoff: 'Hẹn gặp anh em Văn Hóa trong ngày đặc biệt này!',
    journeyArrival: 'Mời nhóm anh em văn hoá cùng chung vui!',
    hasJourney: true
  }
};

export function getRouteConfig(pathname = '/') {
  let clean = '';
  try {
    clean = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, '').toLowerCase();
  } catch {
    clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  }
  if (clean === 'index.html') clean = '';
  if (Object.hasOwn(routes, clean)) return routes[clean];
  return routes[''];
}

export function resolveGuest(pathname = '/') {
  return getRouteConfig(pathname).recipient;
}


