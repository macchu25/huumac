import test from 'node:test';
import assert from 'node:assert/strict';
import { getRouteConfig, resolveGuest } from '../dist/guests.js';

test('invitation is shared for everyone at root', () => {
  assert.equal(resolveGuest('/'), 'Thân mời mọi người');
  assert.equal(resolveGuest('/index.html'), 'Thân mời mọi người');
});

test('ngocmai route invites friend Ngoc without journey', () => {
  const config = getRouteConfig('/ngocmai');
  assert.equal(config.recipient, 'Mời bạn Ngọc');
  assert.equal(config.hasJourney, false);
});

test('nhanoi route invites Nha Noi with appropriate wording', () => {
  const config = getRouteConfig('/nhanoi');
  assert.equal(config.recipient, 'Kính mời Nhà Nội');
  assert.equal(config.graduate, 'Con: Mạc Như Hữu');
  assert.equal(config.hasJourney, true);
});

test('nhangoai route invites Nha Ngoai with appropriate wording', () => {
  const config = getRouteConfig('/nhangoai');
  assert.equal(config.recipient, 'Kính mời Nhà Ngoại');
  assert.equal(config.graduate, 'Con: Mạc Như Hữu');
  assert.equal(config.hasJourney, true);
});

test('vanhoa route invites cultural brothers group', () => {
  const config = getRouteConfig('/vanhoa');
  assert.equal(config.recipient, 'Mời nhóm anh em văn hoá');
  assert.equal(config.hasJourney, true);
});


