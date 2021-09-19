import { shallow, ShallowWrapper } from 'enzyme';
import { Mock } from 'ts-mockery';
import { match } from 'react-router';
import { History, Location } from 'history';
import { Collapse, NavbarToggler, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import createMainHeader from '../../src/common/MainHeader';

describe('<MainHeader />', () => {
  const ServersDropdown = () => null;
  const MainHeader = createMainHeader(ServersDropdown);
  let wrapper: ShallowWrapper;

  const createWrapper = (pathname = '') => {
    const location = Mock.of<Location>({ pathname });

    wrapper = shallow(<MainHeader history={Mock.all<History>()} location={location} match={Mock.all<match>()} />);

    return wrapper;
  };

  afterEach(() => wrapper?.unmount());

  test('ServersDropdown is rendered', () => {
    const wrapper = createWrapper();

    expect(wrapper.find(ServersDropdown)).toHaveLength(1);
  });

  test.each([
    [ '/foo', false ],
    [ '/bar', false ],
    [ '/settings', true ],
  ])('link to settings is only active when current path is settings', (currentPath, isActive) => {
    const wrapper = createWrapper(currentPath);
    const settingsLink = wrapper.find(NavLink);

    expect(settingsLink.prop('active')).toEqual(isActive);
  });

  test('expected class is rendered based on the nav bar state', () => {
    const wrapper = createWrapper();

    expect(wrapper.find(NavbarToggler).find(FontAwesomeIcon).prop('className')).toEqual('main-header__toggle-icon');
    wrapper.find(NavbarToggler).simulate('click');
    expect(wrapper.find(NavbarToggler).find(FontAwesomeIcon).prop('className')).toEqual(
      'main-header__toggle-icon main-header__toggle-icon--opened',
    );
    wrapper.find(NavbarToggler).simulate('click');
    expect(wrapper.find(NavbarToggler).find(FontAwesomeIcon).prop('className')).toEqual('main-header__toggle-icon');
  });

  test('opens Collapse when clicking toggle', () => {
    const wrapper = createWrapper();

    expect(wrapper.find(Collapse).prop('isOpen')).toEqual(false);
    wrapper.find(NavbarToggler).simulate('click');
    expect(wrapper.find(Collapse).prop('isOpen')).toEqual(true);
    wrapper.find(NavbarToggler).simulate('click');
    expect(wrapper.find(Collapse).prop('isOpen')).toEqual(false);
  });
});
