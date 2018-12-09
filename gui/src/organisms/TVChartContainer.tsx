import * as React from 'react'
import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  LanguageCode,
  widget,
} from '../charting_library/charting_library.min'

export interface IChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol'],
  interval: ChartingLibraryWidgetOptions['interval'],

  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl: string,
  libraryPath: ChartingLibraryWidgetOptions['library_path'],
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'],
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'],
  clientId: ChartingLibraryWidgetOptions['client_id'],
  userId: ChartingLibraryWidgetOptions['user_id'],
  fullscreen: ChartingLibraryWidgetOptions['fullscreen'],
  autosize: ChartingLibraryWidgetOptions['autosize'],
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'],
  containerId: ChartingLibraryWidgetOptions['container_id'],
}

function getLanguageFromURL(): LanguageCode | null {
  const regex = new RegExp('[\\?&]lang=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode
}

export class TVChartContainer extends React.PureComponent<Partial<IChartContainerProps>, {}> {
  public static defaultProps: IChartContainerProps = {
    autosize: true,
    chartsStorageApiVersion: '1.1',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    clientId: 'tradingview.com',
    containerId: 'tv_chart_container',
    datafeedUrl: 'https://demo_feed.tradingview.com',
    fullscreen: false,
    interval: 'D',
    libraryPath: '/charting_library/',
    studiesOverrides: {},
    symbol: 'AAPL',
    userId: 'public_user_id',
  }

  private tvWidget: IChartingLibraryWidget | null = null

  public componentDidMount(): void {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      autosize: this.props.autosize,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      charts_storage_url: this.props.chartsStorageUrl,
      client_id: this.props.clientId,
      container_id: this.props.containerId as ChartingLibraryWidgetOptions['container_id'],
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      fullscreen: this.props.fullscreen,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      interval: this.props.interval as ChartingLibraryWidgetOptions['interval'],
      library_path: this.props.libraryPath as string,

      locale: getLanguageFromURL() || 'en',
      overrides: {
        'paneProperties.background': '#1C2731',
        'scalesProperties.backgroundColor': '#1C2731',
      },
      studies_overrides: this.props.studiesOverrides,
      symbol: this.props.symbol as string,
      theme: 'Dark',
      toolbar_bg: '#101921',
      user_id: this.props.userId,
    }

    this.tvWidget = new widget(widgetOptions)
  }

  public componentDidUpdate(prevProps: Partial<IChartContainerProps>): void {
    if (prevProps.symbol !== this.props.symbol && this.tvWidget) {
      this.tvWidget.setSymbol(
        this.props.symbol as string,
        this.props.interval as ChartingLibraryWidgetOptions['interval'],
        () => null,
        )
    }
  }

  public componentWillUnmount(): void {
    if (this.tvWidget !== null) {
      this.tvWidget.remove()
      this.tvWidget = null
    }
  }

  public render(): JSX.Element {
    return (
      <div
        id={ this.props.containerId }
        className={ 'TVChartContainer' }
        style={{ height: 500 }}
      />
    )
  }
}
